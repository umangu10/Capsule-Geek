import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
 
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {

      setFormMessage('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setFormMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(
      (element) => observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main content*/}
      <main id="main-content">
        {/* hero section  */}
        <section className="hero" role="banner" aria-labelledby="hero-title">
          <div className="cyber-lines" aria-hidden="true"></div>
          <div className="hero-content">
            <div className="hero-left">
              <div className="cyber-tag" aria-label="System status indicator">
                <span className="tag-bracket" aria-hidden="true">[</span>
                <span className="tag-text">SYSTEM_ACTIVE</span>
                <span className="tag-bracket" aria-hidden="true">]</span>
              </div>
              
              <h1 id="hero-title" className="hero-title">
                <div className="glitch-wrapper">
                  <span className="line">MASTER THE ART OF</span>
                  <span className="line accent">CYBER SECURITY</span>
                </div>
              </h1>

              <div className="hero-description">
                <div className="typing-effect" role="text">
                  Advanced Security Training Platform
                </div>
                <p className="sub-text">Join the elite force of cyber defenders</p>
              </div>

              <div className="hero-cta" role="group" aria-label="Get started actions">
                <Link to="/courses" className="cyber-btn primary" role="button">
                  <span className="btn-content">Initialize Training</span>
                  <span className="btn-glitch" aria-hidden="true"></span>
                </Link>
                <Link to="/labs" className="cyber-btn secondary" role="button">
                  <span className="btn-content">Access Labs</span>
                  <span className="btn-glitch" aria-hidden="true"></span>
                </Link>
              </div>
            </div>

            <div className="hero-right">
              <div className="cyber-terminal" role="presentation" aria-label="Interactive terminal display">
                <div className="terminal-header">
                  <div className="terminal-buttons" aria-hidden="true">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="terminal-title">SYSTEM_ACCESS</div>
                </div>
                <div className="terminal-window" role="log" aria-live="polite">
                  <div className="line">
                    <span className="prompt">$</span>
                    <span className="command">initialize_security_protocol</span>
                  </div>
                  <div className="line">
                    <span className="output">Loading security modules...</span>
                  </div>
                  <div className="line">
                    <span className="output">Preparing training environment...</span>
                  </div>
                  <div className="line">
                    <span className="prompt">$</span>
                    <span className="command">activate_defense_matrix</span>
                  </div>
                  <div className="line">
                    <span className="output success">System ready. Welcome, recruit.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section 
          className="features animate-on-scroll" 
          aria-labelledby="features-title"
        >
          <h2 id="features-title" className="section-title">
            Training Modules
          </h2>
          <div className="features-grid">
            {[
              {
                title: "Penetration Testing",
                description: "Master ethical hacking with real-world scenarios",
                icon: "🔍"
              },
              {
                title: "Network Security",
                description: "Advanced network defense techniques",
                icon: "🌐"
              },
              {
                title: "Malware Analysis",
                description: "Deep dive into malicious code analysis",
                icon: "🔬"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats section */}
        <section 
          className="home-stats-section animate-on-scroll" 
          aria-labelledby="stats-title"
        >
          <h2 id="stats-title" className="home-section-title">Platform Statistics</h2>
          <div className="home-stats-grid">
            {[
              { 
                number: "00", 
                label: "Active Users", 
                icon: "👥",
                description: "Growing community of security professionals"
              },
              { 
                number: "00", 
                label: "Lab Scenarios", 
                icon: "🔬",
                description: "Real-world security challenges"
              },
              { 
                number: "00", 
                label: "Expert Mentors", 
                icon: "👨‍🏫",
                description: "Industry professionals guiding you"
              },
              { 
                number: "100%", 
                label: "Success Rate", 
                icon: "📈",
                description: "Career advancement achievement"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="home-stat-card"
                role="article"
                aria-label={`${stat.label} statistics`}
              >
                <div className="home-stat-icon" aria-hidden="true">{stat.icon}</div>
                <div className="home-stat-number">{stat.number}</div>
                <div className="home-stat-label">{stat.label}</div>
                <div className="home-stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning paths */}
        <section 
          className="home-paths-section animate-on-scroll" 
          aria-labelledby="paths-title"
        >
          <h2 className="home-section-title">Specialized Training Paths</h2>
          <div className="home-paths-grid">
            {[
              {
                title: "Offensive Security",
                level: "Advanced",
                duration: "6 months",
                modules: ["Web Penetration", "Mobile Security", "IoT Hacking"]
              },
              {
                title: "Defense Analyst",
                level: "Intermediate",
                duration: "4 months",
                modules: ["Threat Detection", "Incident Response", "Log Analysis"]
              },
              {
                title: "Security Engineer",
                level: "Expert",
                duration: "8 months",
                modules: ["Cloud Security", "DevSecOps", "Architecture"]
              }
            ].map((path, index) => (
              <div key={index} className="home-path-card">
                <div className="home-path-header">
                  <h3>{path.title}</h3>
                  <div className="home-path-meta">
                    <span>{path.level}</span>
                    <span>{path.duration}</span>
                  </div>
                </div>
                <ul className="home-path-modules">
                  {path.modules.map((module, idx) => (
                    <li key={idx}>{module}</li>
                  ))}
                </ul>
                <Link to={`/paths/${path.title.toLowerCase()}`} className="home-path-link">
                  View Path →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Threats section */}
        <section 
          className="home-threats-section animate-on-scroll" 
          aria-labelledby="threats-title"
        >
          <h2 className="home-section-title">Latest Cyber Threats</h2>
          <div className="home-threats-grid">
            {[
              {
                name: "Ransomware Evolution",
                severity: "Critical",
                impact: "Financial Systems",
                date: "2024"
              },
              {
                name: "Zero-Day Exploits",
                severity: "High",
                impact: "Infrastructure",
                date: "2024"
              },
              {
                name: "AI-Powered Attacks",
                severity: "Emerging",
                impact: "Multiple Sectors",
                date: "2024"
              }
            ].map((threat, index) => (
              <div key={index} className="home-threat-card">
                <div className={`home-threat-severity ${threat.severity.toLowerCase()}`}>
                  {threat.severity}
                </div>
                <h3>{threat.name}</h3>
                <div className="home-threat-details">
                  <span>{threat.impact}</span>
                  <span>{threat.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        

        {/* Newsletter*/}
        <section 
          className="home-newsletter-section animate-on-scroll" 
          aria-labelledby="newsletter-title"
        >
          <div className="home-newsletter-content">
            <h2 id="newsletter-title">Stay Updated on Cyber Threats</h2>
            <p>Get weekly security briefings and training updates</p>
            <form 
              className="home-subscribe-form"
              onSubmit={handleSubscribe}
              aria-label="Newsletter subscription form"
            >
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                  aria-describedby="email-help"
                />
                <span id="email-help" className="form-help">
                  We'll never share your email
                </span>
              </div>
              <button 
                type="submit" 
                className="cyber-btn subscribe"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {formMessage && (
              <div 
                className={`form-message ${formMessage.includes('failed') ? 'error' : 'success'}`}
                role="alert"
              >
                {formMessage}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;