import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Toast from './ui/Toast';
import './CourseEnrollment.css';

function CourseEnrollment({ courseId, courseTitle }) {
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already enrolled
    const checkEnrollment = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${user.id}`)) || [];
        setIsEnrolled(enrolledCourses.some(course => course.courseId === courseId));
      }
    };

    checkEnrollment();
  }, [courseId]);

  const handleEnrollment = async () => {
    setLoading(true);
    try {
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }

      // Get user's enrolled courses
      const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${user.id}`)) || [];

      // Check if already enrolled
      if (enrolledCourses.some(course => course.courseId === courseId)) {
        navigate(`/courses/${courseId}/learn`);
        return;
      }

      // Create new enrollment
      const newEnrollment = {
        courseId,
        courseTitle,
        enrollmentDate: new Date().toISOString(),
        progress: 0,
        lastAccessed: new Date().toISOString(),
        completedModules: [],
        quizScores: [],
        status: 'in_progress'
      };

      // Update enrolled courses
      localStorage.setItem(
        `enrolledCourses_${user.id}`,
        JSON.stringify([...enrolledCourses, newEnrollment])
      );

      // Update user's progress tracking
      const userProgress = {
        totalModulesCompleted: 0,
        lastAccessedDate: new Date().toISOString(),
        timeSpent: 0,
        certificateEarned: false
      };

      localStorage.setItem(
        `courseProgress_${user.id}_${courseId}`,
        JSON.stringify(userProgress)
      );

      // Redirect to course content
      navigate(`/courses/${courseId}/learn`);

    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-section">
      <Button
        onClick={handleEnrollment}
        loading={loading}
        disabled={loading}
        variant="primary"
        fullWidth
      >
        {isEnrolled ? 'Continue Learning' : 'Enroll Now - Free'}
      </Button>
    </div>
  );
}

export default CourseEnrollment; 