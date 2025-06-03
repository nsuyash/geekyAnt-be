const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/models.users');
const auth = require('../middleware/authMiddleware');
const mongoose = require("mongoose")
const { authorizeRoles } = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, name, password, role, skills, seniority, maxCapacity, department } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      name,
      role,
      skills: role === 'engineer' ? skills : [],
      seniority: role === 'engineer' ? seniority : undefined,
      maxCapacity: role === 'engineer' ? maxCapacity : undefined,
      department,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

// GET /api/auth/profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

router.put('/profile/:id', auth, authorizeRoles('engineer', 'manager'), async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Validate userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    } 

    // Authorization: only managers or the user themselves can update
    if (req.user.role  !== "manager" && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this profile." });
    }

    // Allowed fields to update
    const allowedFields = ['name', 'skills', 'seniority', 'department'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    // Find user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Apply updates
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });

    await user.save();

    // Return updated user without password
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
});

module.exports = router;
