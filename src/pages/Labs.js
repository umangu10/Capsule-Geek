import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Labs.css';

function Labs() {
  const [filter, setFilter] = useState('all');

  const labs = [
    {
      id: "1",
      title: "Web Application Penetration Testing",
      category: "web",
      difficulty: "Intermediate",
      points: 500,
      timeLimit: "2 hours",
      type: "CTF",
      description: "Practice identifying and exploiting common web vulnerabilities.",
      status: "active",
      participants: 234,
      completionRate: "67%"
    },
    {
      id: "2",
      title: "Network Traffic Analysis",
      category: "network",
      difficulty: "Advanced",
      points: 750,
      timeLimit: "3 hours",
      type: "Lab",
      description: "Analyze network traffic patterns and detect anomalies.",
      status: "active",
      participants: 156,
      completionRate: "45%"
    },
    {
      id: "3",
      title: "Malware Reverse Engineering",
      category: "malware",
      difficulty: "Expert",
      points: 1000,
      timeLimit: "4 hours",
      type: "Challenge",
      description: "Reverse engineer malicious software and analyze its behavior.",
      status: "active",
      participants: 89,
      completionRate: "32%"
    }
  ];

  const filteredLabs = filter === 'all' 
    ? labs 
    : labs.filter(lab => lab.category === filter);

  return (
    <div className="labs-page">
      <section className="labs-hero">
        <div className="hero-content">
          <h1>Security Labs & CTF</h1>
          <p>Practice your skills in real-world scenarios</p>
        </div>
      </section>

      <div className="labs-container">
        <div className="filter-section">
          <div className="cyber-terminal">
            <div className="terminal-header">
              <span className="terminal-title">SELECT_CATEGORY</span>
            </div>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                ALL_LABS
              </button>
              <button 
                className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
                onClick={() => setFilter('web')}
              >
                WEB_SECURITY
              </button>
              <button 
                className={`filter-btn ${filter === 'network' ? 'active' : ''}`}
                onClick={() => setFilter('network')}
              >
                NETWORK
              </button>
              <button 
                className={`filter-btn ${filter === 'malware' ? 'active' : ''}`}
                onClick={() => setFilter('malware')}
              >
                MALWARE
              </button>
            </div>
          </div>
        </div>

        <div className="labs-grid">
          {filteredLabs.map(lab => (
            <div key={lab.id} className="lab-card">
              <div className="lab-header">
                <span className={`difficulty-badge ${lab.difficulty.toLowerCase()}`}>
                  {lab.difficulty}
                </span>
                <span className="type-badge">{lab.type}</span>
              </div>
              
              <div className="lab-content">
                <h3>{lab.title}</h3>
                <p className="description">{lab.description}</p>
                
                <div className="lab-meta">
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    {lab.timeLimit}
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-trophy"></i>
                    {lab.points} pts
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-users"></i>
                    {lab.participants} users
                  </div>
                </div>

                <div className="completion-rate">
                  <span className="label">Completion Rate</span>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: lab.completionRate }}
                    ></div>
                  </div>
                  <span className="rate">{lab.completionRate}</span>
                </div>

                <Link to={`/labs/pentesting/${lab.id}`} className="cyber-btn">
                  <span className="btn-text">Start Lab</span>
                  <span className="btn-glitch"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Labs;