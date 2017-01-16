(function() {
  let mongoose = require('mongoose');

  let schema = new mongoose.Schema({
    name: String,
    mime: String,
    size: Number,
    path: String,
  });

  // Adds an instance method to documents constructed from Models compiled from this schema.
  // schema.methods.fileName = function() {
  //   return this.name;
  // }
  schema.method('fileName', function() {
    return this.name;
  });

  // Adds static "class" methods to Models compiled from this schema.
  // schema.statics.findAll = function(cb) {
  //   return this.find({}, cb);
  // }
  schema.static('findAll', function(cb) {
    return this.find({}, cb);
  });

  module.exports = mongoose.model('file', schema);
})();