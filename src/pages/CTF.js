// src/pages/CTF.js
import React, { useState } from 'react';
import { FaTrophy, FaLock, FaBug, FaSearch, FaFilter } from 'react-icons/fa';
import './CTF.css';
import { useNavigate } from 'react-router-dom';

function CTF() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const challenges = [
    // Easy Challenges
    {
      id: 1,
      title: "Basic Web Recon",
      description: "Learn the basics of web reconnaissance. Explore HTTP headers, source code analysis, and basic enumeration techniques.",
      points: 50,
      difficulty: "easy",
      category: "web",
      solves: 120,
      tags: ["web", "recon", "basics"]
    },
    {
      id: 2,
      title: "Simple Cipher",
      description: "Break basic substitution ciphers and decode hidden messages using classical cryptography techniques.",
      points: 75,
      difficulty: "easy",
      category: "crypto",
      solves: 95,
      tags: ["crypto", "classical", "basics"]
    },
    // Medium Challenges
    {
      id: 3,
      title: "SQL Injection 101",
      description: "Exploit SQL injection vulnerabilities to bypass authentication and extract sensitive data from databases.",
      points: 150,
      difficulty: "medium",
      category: "web",
      solves: 65,
      tags: ["web", "sql", "injection"]
    },
    {
      id: 4,
      title: "Network Protocol Analysis",
      description: "Analyze network traffic to identify vulnerabilities and extract hidden information from packet captures.",
      points: 200,
      difficulty: "medium",
      category: "network",
      solves: 45,
      tags: ["network", "wireshark", "analysis"]
    },
    // Hard Challenges
    {
      id: 5,
      title: "Advanced Binary Exploitation",
      description: "Exploit complex buffer overflows, bypass ASLR, and craft advanced ROP chains.",
      points: 350,
      difficulty: "hard",
      category: "pwn",
      solves: 20,
      tags: ["pwn", "binary", "advanced"]
    },
    {
      id: 6,
      title: "Kernel Exploitation",
      description: "Identify and exploit vulnerabilities in Linux kernel modules to achieve privilege escalation.",
      points: 500,
      difficulty: "hard",
      category: "pwn",
      solves: 8,
      tags: ["pwn", "kernel", "advanced"]
    }
  ].sort((a, b) => {
    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });

  const filteredChallenges = challenges.filter(challenge => {
    const matchesFilter = activeFilter === 'all' || challenge.category === activeFilter;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStartChallenge = (challengeId) => {
    navigate(`/ctf/challenge/${challengeId}`);
  };

  return (
    <div className="ctf-page">
      <div className="ctf-hero">
        <div className="hero-badge">
          <FaTrophy className="trophy-icon" />
          <span>Live CTF Challenges</span>
        </div>
        <h1>Capture The Flag</h1>
        <p>Progress through challenges from beginner to advanced</p>
      </div>

      <div className="ctf-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search challenges..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <FaFilter className="filter-icon" />
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'crypto' ? 'active' : ''}`}
            onClick={() => setActiveFilter('crypto')}
          >
            Crypto
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'pwn' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pwn')}
          >
            PWN
          </button>
        </div>
      </div>

      <div className="difficulty-sections">
        {['easy', 'medium', 'hard'].map(difficulty => {
          const challengesInDifficulty = filteredChallenges.filter(c => c.difficulty === difficulty);
          if (challengesInDifficulty.length === 0) return null;

          return (
            <div key={difficulty} className={`difficulty-section ${difficulty}`}>
              <h2 className="section-title">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenges
              </h2>
              <div className="challenges-list">
                {challengesInDifficulty.map(challenge => (
                  <div key={challenge.id} className="challenge-card">
                    <div className="challenge-header">
                      <h3>{challenge.title}</h3>
                      <span className={`difficulty-badge ${challenge.difficulty}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="challenge-description">{challenge.description}</p>
                    <div className="challenge-tags">
                      {challenge.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="challenge-footer">
                      <span className="points">{challenge.points} pts</span>
                      <span className="solves">{challenge.solves} solves</span>
                      <button 
                        className="start-btn" 
                        onClick={() => handleStartChallenge(challenge.id)}
                      >
                        Start Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CTF;