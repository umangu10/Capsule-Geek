import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setEnrolledCourses(data.enrolledCourses);
          setCertificates(data.certificates);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.username} />
            ) : (
              <div className="avatar-placeholder">
                {user?.username[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-details">
            <h1>{user?.username}</h1>
            <p className="bio">{user?.bio || 'No bio added yet'}</p>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-value">{user?.progress.totalCoursesEnrolled}</span>
          <span className="stat-label">Courses Enrolled</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{user?.progress.totalCoursesCompleted}</span>
          <span className="stat-label">Courses Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{Math.round(user?.progress.totalTimeSpent / 60)}h</span>
          <span className="stat-label">Learning Time</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-navigation">
          <button 
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            My Courses
          </button>
          <button 
            className={`nav-tab ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Learning Progress</h2>
            <div className="progress-cards">
              {enrolledCourses.map(course => (
                <div key={course._id} className="progress-card">
                  <h3>{course.title}</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{course.progress}% Complete</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="courses-section">
            <h2>Enrolled Courses</h2>
            <div className="courses-grid">
              {enrolledCourses.map(course => (
                <div key={course._id} className="course-card">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span>Progress: {course.progress}%</span>
                    <button 
                      onClick={() => navigate(`/courses/${course._id}/learn`)}
                      className="continue-btn"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="certificates-section">
            <h2>Earned Certificates</h2>
            <div className="certificates-grid">
              {certificates.map(cert => (
                <div key={cert._id} className="certificate-card">
                  <div className="certificate-icon">🏆</div>
                  <h3>{cert.courseId.title}</h3>
                  <p>Earned on {new Date(cert.earnedDate).toLocaleDateString()}</p>
                  <a 
                    href={cert.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-cert-btn"
                  >
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;