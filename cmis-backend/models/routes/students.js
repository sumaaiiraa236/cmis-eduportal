const express = require('express');
const Student = require('../Student');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const s = await Student.create(req.body);
  res.json(s);
});

router.get('/', auth, async (req, res) => {
  const q = req.query.q;
  const filter = q ? { $or: [{ name: new RegExp(q, 'i') }, { rollNo: new RegExp(q, 'i') }] } : {};
  const students = await Student.find(filter).populate('course');
  res.json(students);
});

router.get('/:id', auth, async (req, res) => {
  const student = await Student.findById(req.params.id).populate('course');
  res.json(student);
});

module.exports = router;
