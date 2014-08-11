'use strict';

(function (w, d) {
  var socket = w.io.connect(d.location.href);

  socket.on('message', function (data) {
    console.log('message recieved:', data.message);
  });

  function sendCommand (cmd) {
    socket.emit('send', { message: cmd });
  }

  sendCommand('connected!');
})(window, document);
