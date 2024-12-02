// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`cyber-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="cyber-logo">
          <FaShieldAlt className="logo-icon" />
          <span className="logo-text">CapsuleGeek</span>
        </Link>

        <div className="nav-links">
          {[
            { path: '/courses', label: 'Courses' },
            { path: '/labs', label: 'Labs' },
            { path: '/ctf', label: 'CTF' },
            { path: '/plans', label: 'Plans' }
          ].map(({ path, label }) => (
            <Link 
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="auth-buttons">
          <Link to="/login" className="cyber-btn login">
            <span>Login</span>
          </Link>
          <Link to="/register" className="cyber-btn register">
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;