const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllCourses,
  getCourseById,
  getCourseProgress,
  updateCourseProgress,
  getEnrolledCourses,
  searchCourses
} = require('../controllers/courseController');

// Public routes
router.get('/', getAllCourses);
router.get('/search', searchCourses);
router.get('/:id', getCourseById);

// Protected routes
router.get('/enrolled', protect, getEnrolledCourses);
router.get('/:id/progress', protect, getCourseProgress);
router.put('/:id/progress', protect, updateCourseProgress);

module.exports = router; 