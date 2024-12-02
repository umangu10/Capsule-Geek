export const courseProgressService = {
  updateProgress: (userId, courseId, moduleId) => {
    try {
      const progressKey = `courseProgress_${userId}_${courseId}`;
      const progress = JSON.parse(localStorage.getItem(progressKey)) || {
        totalModulesCompleted: 0,
        lastAccessedDate: new Date().toISOString(),
        timeSpent: 0,
        completedModules: [],
        certificateEarned: false
      };

      // Update completed modules
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
        progress.totalModulesCompleted = progress.completedModules.length;
      }

      // Update last accessed date
      progress.lastAccessedDate = new Date().toISOString();

      // Save updated progress
      localStorage.setItem(progressKey, JSON.stringify(progress));

      // Update enrolled courses list
      const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`)) || [];
      const courseIndex = enrolledCourses.findIndex(course => course.courseId === courseId);

      if (courseIndex !== -1) {
        enrolledCourses[courseIndex].progress = 
          (progress.completedModules.length / totalModules) * 100;
        enrolledCourses[courseIndex].lastAccessed = new Date().toISOString();
        localStorage.setItem(`enrolledCourses_${userId}`, JSON.stringify(enrolledCourses));
      }

      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  },

  getProgress: (userId, courseId) => {
    try {
      const progressKey = `courseProgress_${userId}_${courseId}`;
      return JSON.parse(localStorage.getItem(progressKey)) || null;
    } catch (error) {
      console.error('Error getting progress:', error);
      return null;
    }
  },

  updateTimeSpent: (userId, courseId, timeInMinutes) => {
    try {
      const progressKey = `courseProgress_${userId}_${courseId}`;
      const progress = JSON.parse(localStorage.getItem(progressKey)) || {
        totalModulesCompleted: 0,
        lastAccessedDate: new Date().toISOString(),
        timeSpent: 0,
        completedModules: [],
        certificateEarned: false
      };

      progress.timeSpent += timeInMinutes;
      localStorage.setItem(progressKey, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Error updating time spent:', error);
      return false;
    }
  }
}; 