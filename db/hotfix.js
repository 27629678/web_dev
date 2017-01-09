(function() {
  let mongoose = require('mongoose');

  let schema = new mongoose.Schema({
    name: String,
    mime: String,
    size: Number,
    path: String,
  });

  module.exports = mongoose.model('file', schema);
})();