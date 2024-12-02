import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/Courses.css';

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const courses = [
    {
      id: 'network-pentesting',
      title: "Network Penetration Testing",
      category: "advanced",
      level: "Advanced",
      duration: "4 Weeks",
      modules: 15,
      students: "2.5k",
      rating: 4.9,
      price: 0,
      description: "Master advanced network penetration testing techniques and methodologies.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      tags: ["Network Security", "Ethical Hacking", "Penetration Testing"]
    },
    {
      id: 2,
      title: "Web Application Security",
      category: "intermediate",
      level: "Intermediate",
      duration: "4 Weeks",
      modules: 12,
      students: "3.2k",
      rating: 4.8,
      price: 0,
      description: "Learn to identify and exploit web vulnerabilities using modern techniques.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      tags: ["Web Security", "OWASP", "Bug Bounty"]
    },
    {
      id: 3,
      title: "Malware Analysis Fundamentals",
      category: "beginner",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 8,
      students: "1.8k",
      rating: 4.7,
      price: 0,
      description: "Start your journey in malware analysis and reverse engineering.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      tags: ["Malware", "Reverse Engineering", "Security"]
    },
    {
      id: 4,
      title: "Advanced Penetration Testing",
      category: "advanced",
      level: "Advanced",
      duration: "4 Weeks",
      modules: 16,
      students: "1.5k",
      rating: 4.9,
      price: 0,
      description: "Master advanced penetration testing techniques and real-world exploitation methods.",
      image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e",
      tags: ["Advanced Exploitation", "Post Exploitation", "Wireless Security"]
    },
    {
      id: 5,
      title: "Cloud Security Fundamentals",
      category: "intermediate",
      level: "Intermediate",
      duration: "4 Weeks",
      modules: 14,
      students: "2.1k",
      rating: 4.8,
      price: 0,
      description: "Learn to secure cloud infrastructure and applications across major cloud platforms.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
      tags: ["Cloud Security", "AWS", "Azure", "DevSecOps"]
    }
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCourseAccess = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'free') return matchesSearch && course.price === 0;
      if (filter === 'paid') return matchesSearch && course.price > 0;
      return matchesSearch;
    });

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <div className="cyber-grid"></div>
        <div className="hero-content">
          <h1>Security Training Modules</h1>
          <p>Master cybersecurity through hands-on training and real-world scenarios</p>
        </div>
      </div>

      <div className="courses-container">
        <div className="filter-section">
          <div className="cyber-terminal">
            <div className="terminal-header">
              <span className="terminal-title">SEARCH_AND_FILTER</span>
            </div>
            <div className="search-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Courses
                </button>
                <button 
                  className={`filter-btn ${filter === 'free' ? 'active' : ''}`}
                  onClick={() => setFilter('free')}
                >
                  Free Courses
                </button>
                <button 
                  className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
                  onClick={() => setFilter('paid')}
                >
                  Premium Courses
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="card-image">
                <img src={course.image} alt={course.title} />
              </div>
              
              <div className="card-content">
                <h3>{course.title}</h3>
                <p className="description">{course.description}</p>
                
                <div className="tags">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="course-meta">
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    {course.duration}
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-book"></i>
                    {course.modules} Modules
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-users"></i>
                    {course.students} Students
                  </div>
                </div>

                <div className="card-footer">
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(course.rating))}</span>
                    <span className="rating-number">{course.rating}</span>
                  </div>
                  <button 
                    onClick={() => handleCourseAccess(course.id)} 
                    className="cyber-btn"
                    aria-label={`Access ${course.title} module`}
                  >
                    Access Module
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;