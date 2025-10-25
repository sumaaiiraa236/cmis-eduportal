const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','staff','faculty','parent'], default: 'staff' },
  name: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
