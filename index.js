const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const {
  getRandomWord,
  wordPuzzleWords,
  verbSentences,
  generateID,
  castleEscapeSentenceQuestions,
  castleEscapeWordQuestions,
} = require("./data");

const server = http.createServer(app);

const io = new Server(server);
const sessions = {};
var bombRelayPlayers = [];
var wordPuzzlePlayers = [];
var castleEscapePlayers = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  function findMatch(
    gamePlayers,
    event,
    getRandomItem,
    userData,
    list,
    list2,
    isList
  ) {
    console.log(userData);
    for (let i = 0; i < gamePlayers.length; i++) {
      if (gamePlayers[i].socketId === socket.id) return;
    }
    if (gamePlayers.length > 0) {
      const opponent = gamePlayers.shift();
      if (socket.id !== opponent.socketId) {
        const sessionId = `match_${socket.id}_${opponent.socketId}`;

        sessions[sessionId] = {
          IDs: [socket.id, opponent.socketId],
          players: [userData, opponent.userData],
        };
        socket.join(sessionId);
        io.sockets.sockets.get(opponent.socketId)?.join(sessionId);

        console.log(
          `Match found! ${socket.id} vs ${opponent.socketId} in ${sessionId}`
        );
        let item;
        console.log(event == "matchFound/castleEscape");
        if (event == "matchFound/castleEscape") {
          item = [];
          words = [];
          options = [];
          definitions = [];
          for (let i = 0; i < 2; i++) {
            item.push(getRandomItem(list));
          }
          for (let i = 0; i < 2; i++) {
            item.push(getRandomItem(list2));
          }
          for (let i = 0; i < 25; i++) {
            options.push(getRandomItem(list2).word);
          }

          for (let i = 0; i < 4; i++) {
            words.push(item[i].word);
            definitions.push(item[i].definition);
          }

          io.to(opponent.socketId).emit(event, {
            sessionId,
            players: sessions[sessionId].players,
            word: words,
            options: options,
            definition: definitions,
          });
          io.to(socket.id).emit(event, {
            sessionId,
            players: sessions[sessionId].players,
            word: words,
            options: options,
            definition: definitions,
          });
          return;
        }

        if (isList) {
          item = [];
          words = [];
          definitions = [];
          for (let i = 0; i < 4; i++) {
            item.push(getRandomItem(list));
          }
          for (let i = 0; i < 4; i++) {
            words.push(item[i].word);
            definitions.push(item[i].definition);
          }
          io.to(socket.id).emit(event, {
            sessionId,
            players: sessions[sessionId].players,
            word: words,
            first: true,
            definition: definitions,
          });
          io.to(opponent.socketId).emit(event, {
            sessionId,
            players: sessions[sessionId].players,
            word: words,
            first: false,
            definition: definitions,
          });
          return;
        }
        item = getRandomItem();

        io.to(socket.id).emit(event, {
          sessionId,
          players: sessions[sessionId].players,
          sentence: item,
        });

        io.to(opponent.socketId).emit(event, {
          sessionId,
          players: sessions[sessionId].players,
          sentence: item,
        });
      }
    } else {
      gamePlayers.push({ socketId: socket.id, userData: userData });
      console.log(`${socket.id} is waiting for a match in ${event}.`);
    }
  }

  socket.on("findMatch/bombRelay", (userData) =>
    findMatch(
      bombRelayPlayers,
      "matchFound/bombRelay",
      getRandomWord,
      userData,
      verbSentences,
      null,
      true
    )
  );
  socket.on("findMatch/castleEscape", (userData) =>
    findMatch(
      castleEscapePlayers,
      "matchFound/castleEscape",
      getRandomWord,
      userData,
      castleEscapeSentenceQuestions,
      castleEscapeWordQuestions,
      true
    )
  );
  socket.on("findMatch/wordPuzzle", (userData) =>
    findMatch(
      wordPuzzlePlayers,
      "matchFound/wordPuzzle",
      getRandomWord,
      userData,
      wordPuzzleWords,
      null,
      true
    )
  );

  socket.on("createSession", ({ gameName, userData }) => {
    const sessionId = generateID();
    sessions[sessionId] = {
      gameName,
      creator: socket.id,
      IDs: [socket.id],
      players: [userData],
      status: "waiting",
    };

    socket.join(sessionId);
    console.log(
      `Session ${sessionId} created for game ${gameName} by ${socket.id}`
    );

    socket.emit("sessionCreated", {
      sessionId,
      gameName,
      players: sessions[sessionId].players,
      isCreator: true,
    });
  });

  socket.on("joinSession", ({ sessionId, userData }) => {
    if (!sessions[sessionId]) {
      socket.emit("error", "Session does not exist!");
      return;
    }

    if (sessions[sessionId].players.length >= 2) {
      socket.emit("error", "Session is full!");
      return;
    }

    sessions[sessionId].players.push(socket.id);
    sessions[sessionId].userData.push(userData);
    sessions[sessionId].status = "playing";

    socket.join(sessionId);
    console.log(`User ${socket.id} joined session ${sessionId}`);

    // Notify both players that the game can start
    io.to(sessionId).emit("sessionJoined", {
      sessionId,
      gameName: sessions[sessionId].gameName,
      players: sessions[sessionId].userData,
      isCreator: false,
    });

    // Start the game based on the game type
    const gameName = sessions[sessionId].gameName;
    const players = sessions[sessionId].userData;

    switch (gameName) {
      case "bombRelay":
        const bombRelayItem = [];
        const bombRelayWordList = [];
        const bombRelayDefinitions = [];
        for (let i = 0; i < 4; i++) {
          bombRelayItem.push(getRandomWord(verbSentences));
        }
        for (let i = 0; i < 4; i++) {
          bombRelayWordList.push(bombRelayItem[i].word);
          bombRelayDefinitions.push(bombRelayItem[i].definition);
        }
        io.to(sessionId).emit("matchFound/wordPuzzle", {
          sessionId,
          players,
          word: bombRelayWordList,
          definition: bombRelayDefinitions,
        });

        break;

      case "wordPuzzle":
        const wordPuzzleItems = [];
        const wordPuzzleWordsList = [];
        const wordPuzzleDefinitions = [];
        for (let i = 0; i < 4; i++) {
          wordPuzzleItems.push(getRandomWord(wordPuzzleWords));
        }
        for (let i = 0; i < 4; i++) {
          wordPuzzleWordsList.push(wordPuzzleItems[i].word);
          wordPuzzleDefinitions.push(wordPuzzleItems[i].definition);
        }
        io.to(sessionId).emit("matchFound/wordPuzzle", {
          sessionId,
          players,
          word: wordPuzzleWordsList,
          definition: wordPuzzleDefinitions,
        });
        break;

      case "castleEscape":
        const castleItems = [];
        const castleWords = [];
        const castleOptions = [];
        const castleDefinitions = [];

        for (let i = 0; i < 2; i++) {
          castleItems.push(getRandomWord(castleEscapeSentenceQuestions));
        }
        for (let i = 0; i < 2; i++) {
          castleItems.push(getRandomWord(castleEscapeWordQuestions));
        }
        for (let i = 0; i < 25; i++) {
          castleOptions.push(getRandomWord(castleEscapeWordQuestions).word);
        }
        for (let i = 0; i < 4; i++) {
          castleWords.push(castleItems[i].word);
          castleDefinitions.push(castleItems[i].definition);
        }

        io.to(sessionId).emit("matchFound/castleEscape", {
          sessionId,
          players,
          word: castleWords,
          options: castleOptions,
          definition: castleDefinitions,
        });
        break;
    }
  });

  socket.on("sendMessage", ({ sessionId, sender, message, action }) => {
    if (!sessions[sessionId]) {
      socket.emit("error", "Session does not exist!");
      return;
    }
    console.log(message + sender);
    io.to(sessionId).emit("receiveMessage", { sender, message, action });
  });

  socket.on("leaveSession", (sessionId) => {
    if (!sessions[sessionId]) return;

    const wasCreator = sessions[sessionId].creator === socket.id;
    sessions[sessionId].players = sessions[sessionId].players.filter(
      (id) => id !== socket.id
    );
    sessions[sessionId].userData = sessions[sessionId].userData.filter(
      (user) => user.id !== socket.id
    );

    socket.leave(sessionId);
    console.log(`User ${socket.id} left session ${sessionId}`);

    if (sessions[sessionId].players.length === 0) {
      delete sessions[sessionId];
      console.log(`Session ${sessionId} deleted`);
    } else {
      if (wasCreator) {
        // Assign new creator if the original creator left
        sessions[sessionId].creator = sessions[sessionId].players[0];
      }
      io.to(sessionId).emit("sessionUpdate", sessions[sessionId]);
      io.to(sessionId).emit("playerLeft", { playerId: socket.id });
    }
  });

  socket.on("disconnect", () => {
    const playerIndexRelay = bombRelayPlayers.findIndex(
      (p) => p.socketId === socket.id
    );
    if (playerIndexRelay !== -1) {
      const player = bombRelayPlayers.splice(playerIndexRelay, 1)[0];
      console.log(`${player.socketId} disconnected from Bomb Relay.`);
    }

    const playerIndexCastle = castleEscapePlayers.findIndex(
      (p) => p.socketId === socket.id
    );
    if (playerIndexCastle !== -1) {
      const player = castleEscapePlayers.splice(playerIndexCastle, 1)[0];
      console.log(`${player.socketId} disconnected from Castle Escape.`);
    }

    const playerIndexPuzzle = wordPuzzlePlayers.findIndex(
      (p) => p.socketId === socket.id
    );
    if (playerIndexPuzzle !== -1) {
      const player = wordPuzzlePlayers.splice(playerIndexPuzzle, 1)[0];
      console.log(`${player.socketId} disconnected from Word Puzzle.`);
    }

    Object.keys(sessions).forEach((sessionId) => {
      if (sessions[sessionId].players.includes(socket.id)) {
        const wasCreator = sessions[sessionId].creator === socket.id;
        sessions[sessionId].players = sessions[sessionId].players.filter(
          (id) => id !== socket.id
        );
        sessions[sessionId].userData = sessions[sessionId].userData.filter(
          (user) => user.id !== socket.id
        );

        if (sessions[sessionId].players.length === 0) {
          delete sessions[sessionId];
          console.log(`Session ${sessionId} deleted due to disconnect`);
        } else {
          if (wasCreator) {
            // Assign new creator if the original creator left
            sessions[sessionId].creator = sessions[sessionId].players[0];
          }
          io.to(sessionId).emit("playerDisconnected", { playerId: socket.id });
        }
      }
    });

    console.log(`${socket.id} disconnected.`);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
