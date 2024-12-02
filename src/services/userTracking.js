export const userTrackingService = {
  // Generate unique tracking ID for user
  generateTrackingId: () => {
    return 'TR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  },

  // Initialize user tracking
  initializeTracking: (userId) => {
    const trackingId = userTrackingService.generateTrackingId();
    const tracking = {
      userId,
      trackingId,
      activities: [],
      lastActive: new Date().toISOString(),
      totalTimeSpent: 0,
      coursesViewed: [],
      quizzesTaken: [],
      labsAccessed: []
    };
    localStorage.setItem(`tracking_${userId}`, JSON.stringify(tracking));
    return trackingId;
  },

  // Track activity
  trackActivity: (userId, activity) => {
    const tracking = JSON.parse(localStorage.getItem(`tracking_${userId}`));
    if (!tracking) return;

    const newActivity = {
      ...activity,
      timestamp: new Date().toISOString()
    };

    tracking.activities.unshift(newActivity);
    tracking.lastActive = new Date().toISOString();

    // Keep only last 50 activities
    if (tracking.activities.length > 50) {
      tracking.activities = tracking.activities.slice(0, 50);
    }

    localStorage.setItem(`tracking_${userId}`, JSON.stringify(tracking));
  },

  // Track course view
  trackCourseView: (userId, courseId, courseTitle) => {
    const tracking = JSON.parse(localStorage.getItem(`tracking_${userId}`));
    if (!tracking) return;

    if (!tracking.coursesViewed.some(c => c.courseId === courseId)) {
      tracking.coursesViewed.push({
        courseId,
        courseTitle,
        firstViewed: new Date().toISOString(),
        viewCount: 1
      });
    } else {
      const course = tracking.coursesViewed.find(c => c.courseId === courseId);
      course.viewCount += 1;
    }

    localStorage.setItem(`tracking_${userId}`, JSON.stringify(tracking));
  },

  // Track quiz attempt
  trackQuizAttempt: (userId, courseId, quizId, score) => {
    const tracking = JSON.parse(localStorage.getItem(`tracking_${userId}`));
    if (!tracking) return;

    tracking.quizzesTaken.push({
      courseId,
      quizId,
      score,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem(`tracking_${userId}`, JSON.stringify(tracking));
  },

  // Track lab access
  trackLabAccess: (userId, labId, labTitle) => {
    const tracking = JSON.parse(localStorage.getItem(`tracking_${userId}`));
    if (!tracking) return;

    tracking.labsAccessed.push({
      labId,
      labTitle,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem(`tracking_${userId}`, JSON.stringify(tracking));
  },

  // Get user tracking data
  getUserTracking: (userId) => {
    return JSON.parse(localStorage.getItem(`tracking_${userId}`));
  },

  // Get user activity summary
  getActivitySummary: (userId) => {
    const tracking = JSON.parse(localStorage.getItem(`tracking_${userId}`));
    if (!tracking) return null;

    return {
      totalCourses: tracking.coursesViewed.length,
      totalQuizzes: tracking.quizzesTaken.length,
      totalLabs: tracking.labsAccessed.length,
      lastActive: tracking.lastActive,
      recentActivities: tracking.activities.slice(0, 10)
    };
  }
}; 