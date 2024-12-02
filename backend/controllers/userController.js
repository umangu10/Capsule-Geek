const store = require('../data/store');

exports.getUserProfile = async (req, res) => {
  try {
    const user = store.findUserById(req.user.id);
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
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = store.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user data
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
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const enrollments = store.getUserEnrollments(req.user.id);
    const progress = enrollments.map(enrollment => ({
      courseId: enrollment.courseId,
      progress: enrollment.progress,
      lastAccessed: enrollment.lastAccessed
    }));

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    const enrollments = store.getUserEnrollments(req.user.id);
    const enrolledCourses = enrollments.map(enrollment => {
      const course = store.getCourseById(enrollment.courseId);
      return {
        ...course,
        progress: enrollment.progress,
        lastAccessed: enrollment.lastAccessed
      };
    });

    res.json({
      success: true,
      data: enrolledCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user enrollments',
      error: error.message
    });
  }
};

exports.getUserCertificates = async (req, res) => {
  try {
    const enrollments = store.getUserEnrollments(req.user.id);
    const certificates = enrollments
      .filter(enrollment => enrollment.progress === 100)
      .map(enrollment => {
        const course = store.getCourseById(enrollment.courseId);
        return {
          courseId: course.id,
          courseName: course.title,
          completedDate: enrollment.lastAccessed
        };
      });

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user certificates',
      error: error.message
    });
  }
}; 