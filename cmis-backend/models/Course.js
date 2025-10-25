const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  duration: String,
  credits: Number,
  department: String
});
module.exports = mongoose.model('Course', courseSchema);
