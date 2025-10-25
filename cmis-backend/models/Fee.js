const mongoose = require('mongoose');
const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  total: Number,
  paid: Number,
  balance: Number,
  dueDate: Date
}, { timestamps: true });
module.exports = mongoose.model('Fee', feeSchema);
