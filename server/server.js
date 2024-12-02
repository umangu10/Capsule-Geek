const express = require('express');
const app = express();

// Add this near your other routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = require('./data/courses');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ... rest of the code ... 