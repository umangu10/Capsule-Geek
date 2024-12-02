import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaYoutube } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand Section */}
        <div className="footer-section brand">
          <div className="footer-logo">
            <span className="logo-text">Capsule</span>
            <span className="logo-accent">Geek</span>
          </div>
          <p className="brand-description">
            Empowering cybersecurity professionals with cutting-edge training and hands-on labs.
            Join our community of security experts and master the art of cyber defense.
          </p>
          <div className="social-links">
            <a href="https://github.com/capsulegeek" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://twitter.com/capsulegeek" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/capsulegeek" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://discord.gg/capsulegeek" target="_blank" rel="noopener noreferrer">
              <FaDiscord />
            </a>
            <a href="https://youtube.com/capsulegeek" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Training</h4>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/labs">Practice Labs</Link></li>
            <li><Link to="/paths">Learning Paths</Link></li>
            <li><Link to="/challenges">CTF Challenges</Link></li>
            <li><Link to="/certifications">Certifications</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Security Blog</Link></li>
            <li><Link to="/tools">Security Tools</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/events">Upcoming Events</Link></li>
            <li><Link to="/newsletter">Newsletter</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/press">Press Kit</Link></li>
            <li><Link to="/partnerships">Partnerships</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="cyber-line"></div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} CapsuleGeek. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/security">Security</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;