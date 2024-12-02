import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';
import { Link } from 'react-router-dom';
import '../styles/components/CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = () => {
      const coursesData = storageService.getCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <div className="card-content">
            <div className="card-header">
              <span className={`level-badge ${course.level.toLowerCase()}`}>
                {course.level}
              </span>
              <span className="duration">{course.duration}</span>
            </div>
            <h3>{course.title}</h3>
            <p className="description">{course.description}</p>
            <div className="price-container">
              <span className="free-badge">Free</span>
            </div>
            <Link to={`/courses/${course.id}`} className="btn-enroll">
              Start Learning
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList; 