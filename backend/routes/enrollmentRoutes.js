const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  enrollInCourse,
  checkEnrollment,
  getEnrollmentProgress,
  updateEnrollmentProgress
} = require('../controllers/enrollmentController');

// All routes are protected
router.use(protect);

router.post('/enroll', enrollInCourse);
router.get('/check/:courseId', checkEnrollment);
router.get('/progress/:courseId', getEnrollmentProgress);
router.put('/progress/:courseId', updateEnrollmentProgress);

module.exports = router; 