(function() {
  let mongoose = require('mongoose');

  let schema = new mongoose.Schema({
    name: String,
    mime: String,
    size: Number,
    path: String,
  });

  // add method to instance of collection items(document)
  schema.methods.fileName = function() {
    return this.name;
  }

  // add method to model
  schema.statics.findAll = function(cb) {
    return this.find({}, cb);
  }

  module.exports = mongoose.model('file', schema);
})();