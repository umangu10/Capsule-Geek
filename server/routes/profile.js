const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const CourseEnrollment = require('../models/CourseEnrollment');
const Activity = require('../models/Activity');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's enrolled courses
router.get('/courses', auth, async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find({ userId: req.user.id })
      .populate('courseId')
      .sort({ lastAccessed: -1 });

    const courses = enrollments.map(enrollment => ({
      id: enrollment.courseId._id,
      title: enrollment.courseId.title,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons.length,
      totalLessons: enrollment.courseId.totalLessons,
      lastAccessed: enrollment.lastAccessed,
      nextLesson: enrollment.courseId.lessons[enrollment.completedLessons.length]?.title || 'Course Completed'
    }));

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's recent activities
router.get('/activities', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id })
      .populate('courseId', 'title')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course progress
router.post('/courses/:courseId/progress', auth, async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    const enrollment = await CourseEnrollment.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (completed) {
      enrollment.completedLessons.push(lessonId);
      enrollment.progress = (enrollment.completedLessons.length / enrollment.courseId.totalLessons) * 100;
    }

    enrollment.lastAccessed = Date.now();
    await enrollment.save();

    // Create activity
    await Activity.create({
      userId: req.user.id,
      type: 'course_progress',
      description: `Completed lesson: ${lessonId}`,
      courseId: req.params.courseId
    });

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 