import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { userTrackingService } from '../../services/userTracking';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activitySummary, setActivitySummary] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Simulate fetching enrolled courses
    setEnrolledCourses([
      {
        id: 1,
        title: "Network Penetration Testing",
        progress: 65,
        lastAccessed: "2024-01-15",
        nextModule: "Module 4: Network Scanning"
      },
      {
        id: 2,
        title: "Web Application Security",
        progress: 30,
        lastAccessed: "2024-01-14",
        nextModule: "Module 2: XSS Attacks"
      },
      {
        id: 3,
        title: "Malware Analysis Fundamentals",
        progress: 15,
        lastAccessed: "2024-01-13",
        nextModule: "Module 1: Static Analysis"
      }
    ]);

    // Simulate fetching recent activities
    setRecentActivities([
      {
        id: 1,
        type: "quiz",
        course: "Network Penetration Testing",
        detail: "Completed Module 3 Quiz",
        score: "90%",
        date: "2024-01-15"
      },
      {
        id: 2,
        type: "course",
        course: "Web Application Security",
        detail: "Started new module",
        module: "XSS Attacks",
        date: "2024-01-14"
      },
      {
        id: 3,
        type: "certificate",
        course: "Basic Cybersecurity",
        detail: "Earned Certificate",
        date: "2024-01-10"
      }
    ]);

    if (userData) {
      // Initialize tracking if not exists
      let tracking = userTrackingService.getUserTracking(userData.id);
      if (!tracking) {
        const newTrackingId = userTrackingService.initializeTracking(userData.id);
        setTrackingId(newTrackingId);
      } else {
        setTrackingId(tracking.trackingId);
      }

      // Get activity summary
      const summary = userTrackingService.getActivitySummary(userData.id);
      setActivitySummary(summary);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, {user.name}</h1>
          <p>Continue your cybersecurity journey</p>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <span className="stat-value">3</span>
            <span className="stat-label">Courses in Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">Hours Learned</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">85%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </section>

      {/* Add Tracking Info Section */}
      <section className="dashboard-section tracking-info">
        <div className="section-header">
          <h2>Activity Tracking</h2>
          <span className="tracking-id">ID: {trackingId}</span>
        </div>
        {activitySummary && (
          <div className="tracking-stats">
            <div className="stat-item">
              <span className="stat-label">Courses Viewed</span>
              <span className="stat-value">{activitySummary.totalCourses}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Quizzes Taken</span>
              <span className="stat-value">{activitySummary.totalQuizzes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Labs Accessed</span>
              <span className="stat-value">{activitySummary.totalLabs}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Active</span>
              <span className="stat-value">
                {new Date(activitySummary.lastActive).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Enrolled Courses */}
        <section className="dashboard-section enrolled-courses">
          <div className="section-header">
            <h2>Your Courses</h2>
            <Link to="/courses" className="view-all">View All</Link>
          </div>
          <div className="courses-grid">
            {enrolledCourses.map(course => (
              <div key={course.id} className="course-progress-card">
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{course.progress}% Complete</span>
                </div>
                <div className="course-meta">
                  <p>Next: {course.nextModule}</p>
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="continue-btn"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section recent-activity">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'quiz' && '📝'}
                  {activity.type === 'course' && '📚'}
                  {activity.type === 'certificate' && '🏆'}
                </div>
                <div className="activity-content">
                  <h4>{activity.detail}</h4>
                  <p>{activity.course}</p>
                  {activity.score && <span className="score">{activity.score}</span>}
                  <span className="activity-date">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="dashboard-section recommendations">
          <div className="section-header">
            <h2>Recommended Next Steps</h2>
          </div>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <div className="recommendation-icon">🎯</div>
              <div className="recommendation-content">
                <h4>Complete Network Scanning Module</h4>
                <p>Continue your progress in Network Penetration Testing</p>
                <Link to="/courses/1" className="action-btn">
                  Start Module
                </Link>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="recommendation-icon">🏆</div>
              <div className="recommendation-content">
                <h4>Take Practice Quiz</h4>
                <p>Test your knowledge on Web Security Fundamentals</p>
                <Link to="/courses/2/quiz" className="action-btn">
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 