const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req,res)=>{
  try{
    const { email, password, name, role } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'User is already registered. Please login to the application.' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, passwordHash, name, role });
    res.json({ message: 'User registered', userId: user._id });
  }catch(err){ res.status(500).json({ error: err.message }) }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name }});
  }catch(err){ res.status(500).json({ error: err.message }) }
});

module.exports = router;
