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
    if (data && data.message) {
      setXY(data.message[0], data.message[1]);
      draw();
    }
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
    getXY(e);
  }

  function stop (e) {
    state.drawing = false;
  }

  function trace (e) {
    if (state.drawing) {
      getXY(e);
    }
  }

  function getXY (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    setXY(x, y);
    draw();
    sendCommand([x, y]);
  }

  function setXY (x, y) {
    state.prev.x = state.curr.x;
    state.prev.y = state.curr.y;
    state.curr.x = x;
    state.curr.y = y;
  }

  function draw () {
    ctx.beginPath();
    ctx.moveTo(state.prev.x, state.prev.y);
    ctx.lineTo(state.curr.x, state.curr.y);
    ctx.stroke();
    ctx.closePath();
  }

  init();
})(window, document);
