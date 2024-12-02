const store = require('../data/store');

exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Check if course exists
    const course = store.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = store.getEnrollment(userId, courseId);
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = store.enrollUserInCourse(userId, courseId);

    res.status(201).json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message
    });
  }
};

exports.checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = store.getEnrollment(userId, courseId);

    res.json({
      success: true,
      isEnrolled: !!enrollment,
      enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking enrollment',
      error: error.message
    });
  }
};

exports.getEnrollmentProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = store.getEnrollment(userId, courseId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.json({
      success: true,
      progress: enrollment.progress,
      completedModules: enrollment.completedModules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting progress',
      error: error.message
    });
  }
};

exports.updateEnrollmentProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress, moduleId } = req.body;
    const userId = req.user.id;

    const updatedEnrollment = store.updateEnrollmentProgress(userId, courseId, progress);
    if (!updatedEnrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.json({
      success: true,
      enrollment: updatedEnrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
}; 