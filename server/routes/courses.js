const express = require('express');
const router = express.Router();
const courses = require('../data/courses');
const { readDB, writeDB } = require('../utils/database');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = courses.find(c => c.id === req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course
router.post('/enroll', auth, async (req, res) => {
  try {
    const { courseId, courseName } = req.body;
    const db = await readDB();

    // Check if course exists
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = db.enrollments.find(
      e => e.userId === req.user.id && e.courseId === courseId
    );
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create new enrollment
    const enrollment = {
      id: Date.now().toString(),
      userId: req.user.id,
      courseId: courseId,
      progress: 0,
      completedLessons: [],
      lastAccessed: new Date().toISOString(),
      status: 'enrolled'
    };

    // Add enrollment
    db.enrollments.push(enrollment);

    // Update user stats
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    db.users[userIndex].stats.coursesEnrolled += 1;

    // Add activity
    const activity = {
      id: Date.now().toString(),
      userId: req.user.id,
      type: 'course_enrollment',
      description: `Enrolled in ${courseName}`,
      courseId: courseId,
      timestamp: new Date().toISOString()
    };
    db.activities.push(activity);

    await writeDB(db);

    const userResponse = { ...db.users[userIndex] };
    delete userResponse.password;

    res.json({
      user: userResponse,
      enrollment: enrollment
    });

  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
});

// Get user's enrolled courses
router.get('/user/enrolled', auth, async (req, res) => {
  try {
    const db = await readDB();
    const enrollments = db.enrollments.filter(e => e.userId === req.user.id);
    
    const enrolledCourses = enrollments.map(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      return {
        id: course.id,
        title: course.title,
        progress: enrollment.progress,
        completedLessons: enrollment.completedLessons,
        totalLessons: course.lessons.length,
        lastAccessed: enrollment.lastAccessed
      };
    });

    res.json(enrolledCourses);
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    res.status(500).json({ message: 'Failed to fetch enrolled courses' });
  }
});

module.exports = router; 