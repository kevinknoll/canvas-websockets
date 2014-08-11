'use strict';

(function (w, d) {
  var socket = w.io.connect(d.location.href);
  var canvas;
  var ctx;
  var state = {
    drawing: false,
    prev: {
      x: 0,
      y: 0
    },
    curr: {
      x: 0,
      y: 0
    }
  };

  socket.on('message', function (data) {
    console.log('message recieved:', data.message);
  });

  function sendCommand (cmd) {
    socket.emit('send', { message: cmd });
  }

  sendCommand('connected!');

  function init () {
    canvas = d.getElementById('canvas');
    ctx = canvas.getContext('2d');

    bindEvents();
  }

  function bindEvents () {
    canvas.addEventListener('mousemove', trace, false);
    canvas.addEventListener('mousedown', start, false);
    canvas.addEventListener('mouseup', stop, false);
    canvas.addEventListener('mouseout', stop, false);
  }

  function start (e) {
    state.drawing = true;
    findxy(e);
  }

  function stop (e) {
    state.drawing = false;
  }

  function trace (e) {
    if (state.drawing) {
      findxy(e);
      draw();
    }
  }

  function findxy (e) {
    state.prev.x = state.curr.x;
    state.prev.y = state.curr.y;
    state.curr.x = e.clientX - canvas.offsetLeft;
    state.curr.y = e.clientY - canvas.offsetTop;
  }

  function draw () {
    if (!state.drawing) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(state.prev.x, state.prev.y);
    ctx.lineTo(state.curr.x, state.curr.y);
    ctx.stroke();
    ctx.closePath();
  }

  init();
})(window, document);
