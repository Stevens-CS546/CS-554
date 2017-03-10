const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chat = io.of("/chat");
const usersToSocket = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

chat.on('connection', (socket) => {
  socket.join('general'); // join the general room.

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('direct message', (msg) => {
    usersToSocket[msg.userName].emit('private message', {
      from: msg.fromUserName,
      text: msg.text
    });
  });

  socket.on('setup', (connectionInfo) => {
    usersToSocket[connectionInfo.nickname] = socket;
  });

  socket.on('chat message', (msg) => {
    chat.emit('chat message', msg.text);
  });

  socket.emit('request-credentials');
});

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});