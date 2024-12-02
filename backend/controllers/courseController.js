const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select('title description duration level price');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    let isEnrolled = false;
    if (req.user) {
      const enrollment = await Enrollment.findOne({
        userId: req.user.id,
        courseId: course._id
      });
      isEnrolled = !!enrollment;
    }

    res.status(200).json({
      success: true,
      data: {
        ...course.toObject(),
        isEnrolled
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// Get course progress
exports.getCourseProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId: req.params.id
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        progress: enrollment.progress,
        completedModules: enrollment.completedModules,
        lastAccessed: enrollment.lastAccessed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
};

// Update course progress
exports.updateCourseProgress = async (req, res) => {
  try {
    const { moduleId, completed, timeSpent } = req.body;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId: req.params.id
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update completed modules
    if (completed && !enrollment.completedModules.includes(moduleId)) {
      enrollment.completedModules.push(moduleId);
    }

    // Update time spent
    if (timeSpent) {
      enrollment.timeSpent += timeSpent;
    }

    // Calculate progress percentage
    const course = await Course.findById(req.params.id);
    const totalModules = course.syllabus.reduce((acc, week) => 
      acc + week.lessons.length, 0);
    
    enrollment.progress = 
      (enrollment.completedModules.length / totalModules) * 100;

    // Update last accessed
    enrollment.lastAccessed = new Date();

    // Check if course is completed
    if (enrollment.progress === 100 && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
      enrollment.status = 'completed';

      // Update user's completed courses count
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { 'progress.totalCoursesCompleted': 1 }
      });
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
};

// Get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
      .populate('courseId', 'title description duration level')
      .sort({ lastAccessed: -1 });

    const courses = enrollments.map(enrollment => ({
      ...enrollment.courseId.toObject(),
      progress: enrollment.progress,
      lastAccessed: enrollment.lastAccessed,
      status: enrollment.status
    }));

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled courses',
      error: error.message
    });
  }
};

// Search courses
exports.searchCourses = async (req, res) => {
  try {
    const { query } = req.query;
    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).select('title description duration level price');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching courses',
      error: error.message
    });
  }
}; 