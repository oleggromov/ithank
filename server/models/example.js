var mongoose = require('mongoose');

var SomethingScheme = new mongoose.Schema({
  from: String,
  to: String,
  text: String,
  date: { type: Date, default: Date.now }
}, {
  collection: 'something'
});

module.exports = mongoose.model('Something', SomethingScheme);

