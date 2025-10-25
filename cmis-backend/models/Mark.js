const mongoose = require('mongoose');
const markSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  semester: Number,
  internal: Number,
  external: Number,
  total: Number
});
module.exports = mongoose.model('Mark', markSchema);
