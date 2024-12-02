import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../components/ui/Toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import '../styles/pages/CourseDetails.css';

// Example course data
const coursesData = {
  1: {
    title: "Web Application Security",
    description: "Learn how to secure web applications against common vulnerabilities.",
    tools: [
      { name: 'OWASP ZAP', url: 'https://www.zaproxy.org/' },
      { name: 'Burp Suite', url: 'https://portswigger.net/burp' },
      { name: 'Postman', url: 'https://www.postman.com/' },
      { name: 'SQLMap', url: 'http://sqlmap.org/' },
    ],
  },
  // Add more courses as needed
};

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const courseDetails = coursesData[id];
        if (courseDetails) {
          setCourseData(courseDetails);
        } else {
          setToastMessage('Course not found');
          setToastType('error');
          setShowToast(true);
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setToastMessage('Error loading course data');
        setToastType('error');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-details-page">
      <div className="course-content">
        <h1>{courseData.title}</h1>
        <p>{courseData.description}</p>
        <h3>Tools Used:</h3>
        <ul className="tools-list">
          {courseData.tools.map((tool, index) => (
            <li key={index}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                {tool.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default CourseDetails;