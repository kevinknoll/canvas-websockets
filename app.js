var express = require('express');
var socketio = require('socket.io');
var app = express();
var port = 8000;
var io;

app.use(express.static(__dirname + '/public'));

io = socketio.listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  socket.on('send', function (data) {
    io.sockets.emit('message', data);
  });
});

console.log('Listening on port ' + port);
