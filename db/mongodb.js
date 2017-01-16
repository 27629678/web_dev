(function () {
  let db = {};
  module.exports = db;

  db.__hasStart = false;
  let mongoose = require('mongoose');

  db.start = function () {
    if (this.__hasStart) {
      return console.warn('mongodb has started.');
    }

    this.__hasStart = true;
    mongoose.connect('mongodb://localhost/web_dev');
    mongoose.connection.on('connected', function () {
      console.log('mongo db connected.');
    });

    mongoose.connection.on('error', function (err) {
      this.__hasStart = false;
      console.log('mongo db connect failed with error: ' + err + '.');
    });

    mongoose.connection.on('disconnected', function () {
      this.__hasStart = false;
      console.log('mongo db disconnected.');
    });
  }
})();
