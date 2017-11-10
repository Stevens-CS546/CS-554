const express = require("express");
const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http);

const chat = io.of("/chat");
const usersToSocket = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

chat.on("connection", socket => {
  socket.on("join-room", data => {
    socket.leave(data.previousRoom);
    socket.join(data.newRoom);

    socket.emit("joined-room", data.newRoom);
  });

  socket.on("direct message", msg => {
    usersToSocket[msg.userName].emit("private message", {
      from: msg.fromUserName,
      text: msg.text
    });
  });

  socket.on("setup", connectionInfo => {
    usersToSocket[connectionInfo.nickname] = socket;
  });

  socket.on("send-message", msg => {
    chat.to(msg.room).emit("receive-message", msg.text);
  });

  socket.emit("request-credentials");
});

http.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
