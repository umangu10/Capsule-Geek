import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storageService } from '../services/storageService';
import '../styles/components/CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = () => {
      const courseData = storageService.getCourseById(id);
      setCourse(courseData);
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Modules</h3>
      <ul>
        {course.modules?.map((module, index) => (
          <li key={index}>
            <h4>{module.title}</h4>
            <p>{module.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails; 