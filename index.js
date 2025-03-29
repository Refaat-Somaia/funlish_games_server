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

        if (event == "matchFound/bombRelay") {
          item = [];
          words = [];
          definitions = [];
          for (let i = 0; i < 2; i++) {
            item.push(getRandomItem(list));
          }
          for (let i = 0; i < 2; i++) {
            item.push(getRandomItem(list2));
          }

          for (let i = 0; i < 4; i++) {
            words.push(item[i].word);
            definitions.push(item[i].definition);
          }
          io.to(opponent.socketId).emit(event, {
            sessionId,
            players: sessions[sessionId].players,
            word: words,
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
      true
    )
  );
  socket.on("findMatch/castleEscape", (userData) =>
    findMatch(
      bombRelayPlayers,
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
      true
    )
  );

  socket.on("createSession", () => {
    io.to(socket.id).emit("sessionUpdate", { id: generateID() });
  });

  socket.on("joinSession", (sessionId) => {
    if (!sessions[sessionId]) {
      socket.emit("error", "Session does not exist!");
      return;
    }
    sessions[sessionId].players.push(socket.id);
    socket.join(sessionId);
    console.log(`User ${socket.id} joined session ${sessionId}`);
    io.to(sessionId).emit("sessionUpdate", sessions[sessionId]);
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
    sessions[sessionId].players = sessions[sessionId].players.filter(
      (id) => id !== socket.id
    );
    socket.leave(sessionId);
    console.log(`User ${socket.id} left session ${sessionId}`);

    if (sessions[sessionId].players.length === 0) {
      delete sessions[sessionId];
      console.log(`Session ${sessionId} deleted`);
    } else {
      io.to(sessionId).emit("sessionUpdate", sessions[sessionId]);
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

    const playerIndexPuzzle = wordPuzzlePlayers.findIndex(
      (p) => p.socketId === socket.id
    );
    if (playerIndexPuzzle !== -1) {
      const player = wordPuzzlePlayers.splice(playerIndexPuzzle, 1)[0];
      console.log(`${player.socketId} disconnected from Word Puzzle.`);
    }

    Object.keys(sessions).forEach((sessionId) => {
      if (sessions[sessionId].IDs.includes(socket.id)) {
        io.to(sessionId).emit("sessionUpdate", {
          message: `User ${socket.id} disconnected. The session has ended.`,
        });
        delete sessions[sessionId];
        console.log(`Session ${sessionId} has been deleted.`);
      }
    });

    console.log(`${socket.id} disconnected.`);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
