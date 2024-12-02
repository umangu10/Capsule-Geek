import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/CourseDetail.css';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Enhanced course data with more details
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
      learningObjectives: [
        "Understand network penetration testing methodologies",
        "Master advanced exploitation techniques",
        "Learn post-exploitation and reporting",
        "Practice with real-world scenarios"
      ],
      syllabus: [
        "Week 1: Network Fundamentals & Reconnaissance",
        "Week 2: Exploitation Techniques",
        "Week 3: Post-Exploitation & Persistence",
        "Week 4: Reporting & Remediation"
      ],
      tools: ["Nmap", "Wireshark", "Metasploit", "Burp Suite"],
      prerequisites: ["Basic networking knowledge", "Linux fundamentals", "Basic scripting skills"]
    },
    {
      id: 'web-security',
      title: "Web Application Security",
      category: "intermediate",
      level: "Intermediate",
      duration: "4 Weeks",
      modules: 12,
      students: "3.2k",
      rating: 4.8,
      price: 0,
      description: "Learn to identify and exploit web vulnerabilities using modern techniques.",
      learningObjectives: [
        "Master OWASP Top 10 vulnerabilities",
        "Learn secure coding practices",
        "Understand web application architecture",
        "Practice with CTF challenges"
      ],
      syllabus: [
        "Week 1: Web Application Basics & Security Fundamentals",
        "Week 2: Common Web Vulnerabilities",
        "Week 3: Advanced Exploitation Techniques",
        "Week 4: Security Testing & Reporting"
      ],
      tools: ["Burp Suite", "OWASP ZAP", "SQLMap", "Nikto"],
      prerequisites: ["Basic web technologies", "HTML/CSS/JavaScript", "Basic networking"]
    },
    // Default course data for unknown courseIds
    {
      id: 'default',
      title: "Cybersecurity Fundamentals",
      category: "beginner",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 10,
      students: "5k+",
      rating: 4.7,
      price: 0,
      description: "Start your journey in cybersecurity with fundamental concepts and practices.",
      learningObjectives: [
        "Understand basic security concepts",
        "Learn essential security tools",
        "Practice basic security techniques",
        "Build a security mindset"
      ],
      syllabus: [
        "Week 1: Introduction to Cybersecurity",
        "Week 2: Security Tools & Techniques",
        "Week 3: Common Threats & Vulnerabilities",
        "Week 4: Security Best Practices"
      ],
      tools: ["Virtual Machines", "Basic Security Tools", "Linux"],
      prerequisites: ["Basic IT knowledge", "Willingness to learn"]
    }
  ];

  // Find the course or use default course
  const course = courses.find(c => c.id === courseId) || courses.find(c => c.id === 'default');

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <h1>{course.title}</h1>
        <div className="course-meta">
          <span className="level">{course.level}</span>
          <span className="duration">{course.duration}</span>
          <span className="price">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
        </div>
      </div>

      <div className="course-content">
        <div className="course-description">
          <h2>Course Overview</h2>
          <p>{course.description}</p>
          
          <div className="course-details">
            <h3>What You'll Learn</h3>
            <ul className="learning-objectives">
              {course.learningObjectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="course-syllabus">
            <h3>Course Syllabus</h3>
            <ul className="syllabus-list">
              {course.syllabus.map((week, index) => (
                <li key={index}>{week}</li>
              ))}
            </ul>
          </div>

          <div className="course-requirements">
            <h3>Prerequisites</h3>
            <ul className="prerequisites-list">
              {course.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>
          </div>

          <div className="course-tools">
            <h3>Tools You'll Use</h3>
            <div className="tools-list">
              {course.tools.map((tool, index) => (
                <span key={index} className="tool-tag">{tool}</span>
              ))}
            </div>
          </div>

          <div className="course-stats">
            <div className="stat">
              <span className="stat-label">Students Enrolled</span>
              <span className="stat-value">{course.students}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Modules</span>
              <span className="stat-value">{course.modules}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Course Rating</span>
              <span className="stat-value">{course.rating}/5</span>
            </div>
          </div>
        </div>

        <div className="course-actions">
          <button className="cyber-btn primary">
            <span className="btn-content">Enroll Now</span>
            <span className="btn-glitch" aria-hidden="true"></span>
          </button>
          <button 
            className="cyber-btn secondary"
            onClick={() => navigate('/courses')}
          >
            <span className="btn-content">Browse All Courses</span>
            <span className="btn-glitch" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail; 