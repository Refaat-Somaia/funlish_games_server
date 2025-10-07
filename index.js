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

  socket.on("createSession", (data) => {
    console.log("Received createSession data:", data);

    const { gameName, userName, userLevel, characterIndex, hatIndex } = data;

    const userData = {
      name: userName || "Unknown",
      level: userLevel || 1,
      characterIndex: characterIndex || 0,
      hatIndex: hatIndex || 0,
      points: 0,
      id: socket.id,
    };

    console.log("Processed userData: " + JSON.stringify(userData));

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

  socket.on("joinSession", (data) => {
    console.log("Received joinSession data:", data);

    const { sessionId, userName, userLevel, characterIndex, hatIndex } = data;

    if (!sessions[sessionId]) {
      socket.emit("error", "Session does not exist!");
      return;
    }

    if (sessions[sessionId].IDs.length >= 2) {
      socket.emit("error", "Session is full!");
      return;
    }

    // Create userData object
    const userData = {
      name: userName || "Unknown",
      level: userLevel || 1,
      characterIndex: characterIndex || 0,
      hatIndex: hatIndex || 0,
      points: 0,
      id: socket.id,
    };

    // Add player to session
    sessions[sessionId].IDs.push(socket.id);
    sessions[sessionId].players.push(userData);
    sessions[sessionId].status = "playing";

    socket.join(sessionId);
    console.log(`User ${socket.id} joined session ${sessionId}`);

    // Notify both players that the game can start
    io.to(sessionId).emit("sessionJoined", {
      sessionId,
      gameName: sessions[sessionId].gameName,
      players: sessions[sessionId].players,
    });

    // Start the game based on the game type
    const gameName = sessions[sessionId].gameName;
    const players = sessions[sessionId].players;

    // Determine who goes first (creator is first player)
    const isFirstPlayer = sessions[sessionId].creator === socket.id;

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
        io.to(sessionId).emit("matchFound/bombRelay", {
          sessionId,
          players,
          word: bombRelayWordList,
          definition: bombRelayDefinitions,
          first: isFirstPlayer, // Add first player indicator
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
          first: isFirstPlayer, // Add first player indicator
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
          // Castle Escape might not need first player indicator
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
    sessions[sessionId].IDs = sessions[sessionId].IDs.filter(
      (id) => id !== socket.id
    );
    sessions[sessionId].players = sessions[sessionId].players.filter(
      (player) => player.id !== socket.id
    );

    socket.leave(sessionId);
    console.log(`User ${socket.id} left session ${sessionId}`);

    if (sessions[sessionId].IDs.length === 0) {
      delete sessions[sessionId];
      console.log(`Session ${sessionId} deleted`);
    } else {
      if (wasCreator) {
        // Assign new creator if the original creator left
        sessions[sessionId].creator = sessions[sessionId].IDs[0];
      }
      io.to(sessionId).emit("sessionUpdate", sessions[sessionId]);
      io.to(sessionId).emit("playerLeft", { playerId: socket.id });
    }
  });

  socket.on("disconnect", () => {
    // Remove from matchmaking queues
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

    // Fixed session cleanup
    Object.keys(sessions).forEach((sessionId) => {
      const session = sessions[sessionId];

      // Check IDs array instead of players array
      const playerIndex = session.IDs.indexOf(socket.id);

      if (playerIndex !== -1) {
        session.IDs.splice(playerIndex, 1);
        const leftPlayerData = session.players.splice(playerIndex, 1)[0];

        const wasCreator = session.creator === socket.id;
        if (wasCreator && session.IDs.length > 0) {
          session.creator = session.IDs[0];
        }

        if (session.IDs.length === 0) {
          delete sessions[sessionId];
          console.log(`Session ${sessionId} deleted due to disconnect`);
        } else {
          io.to(sessionId).emit("playerDisconnected", {
            playerId: socket.id,
            playerData: leftPlayerData,
          });
        }
      }
    });

    console.log(`${socket.id} disconnected.`);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
