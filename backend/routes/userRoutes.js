const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const store = require('../data/store');

// Get user profile
router.get('/profile', protect, (req, res) => {
  try {
    const user = store.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        enrolledCourses: user.enrolledCourses || []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// Update user profile
router.put('/profile', protect, (req, res) => {
  try {
    const user = store.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

module.exports = router; 