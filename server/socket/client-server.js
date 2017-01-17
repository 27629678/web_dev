(function () {
  let socket = {};
  module.exports = socket;

  socket.createServer = function (server) {
    let io = require('socket.io')(server);
    io.on('connect', function (client, ack) {
      console.log('client socket:' + client.id + ' connection established.');
      if (ack) {
        ack('hello, client');
      }

      client.emit('greeting', { msg: 'hello, ' + client.id }, function (msg) {
        console.log('ack.message:' + msg);
      });
      client.on('data', function (message) {
        console.log('receive message:' + message);
      });

      client.on('register', function (name, ack) {
        console.log(name + 'login successfully.');
        ack('ok');
      });

      client.on('close', function (reason) {
        console.log('client socket closed with reason:' + reason);
      });
    });
  }
})();