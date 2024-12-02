import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Plans.css';

function Plans() {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      billing: '',
      features: [
        'Access to Basic Courses',
        'Limited Lab Access',
        'Community Support',
        'Basic CTF Challenges',
        'Monthly Webinars'
      ],
      recommended: false,
      color: '#4CAF50'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '399',
      billing: 'monthly',
      features: [
        'All Basic Features',
        'Full Lab Access',
        'Advanced CTF Challenges',
        'Priority Support',
        'Certification Preparation',
        'Private Discord Channel',
        'Weekly Mentoring Sessions'
      ],
      recommended: true,
      color: '#00E5FF'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '599',
      billing: 'monthly',
      features: [
        'All Pro Features',
        'Custom Training Paths',
        'Team Management',
        'API Access',
        'Dedicated Support',
        'Custom Labs',
        'Private Training Sessions',
        'Corporate Certificates'
      ],
      recommended: false,
      color: '#9D4EDD'
    }
  ];

  return (
    <div className="plans-page">
      <section className="plans-hero">
        <div className="hero-content">
          <h1>Choose Your Training Path</h1>
          <p>Unlock advanced cybersecurity skills with our flexible plans</p>
        </div>
      </section>

      <section className="plans-section">
        <div className="plans-container">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
              style={{'--plan-color': plan.color}}
            >
              {plan.recommended && (
                <div className="recommended-badge">
                  Most Popular
                </div>
              )}
              
              <div className="plan-header">
                <h2>{plan.name}</h2>
                <div className="plan-price">
                  {plan.price === 'Free' ? (
                    <span className="free-text">Free</span>
                  ) : (
                    <>
                      <span className="currency">₹</span>
                      <span className="amount">{plan.price}</span>
                      <span className="billing">/{plan.billing}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="plan-footer">
                <Link 
                  to={plan.price === 'Free' ? '/courses' : `/checkout/${plan.id}`}
                  className={`plan-btn ${plan.recommended ? 'recommended' : ''}`}
                >
                  {plan.price === 'Free' ? 'Start Learning' : 'Get Started'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features-comparison">
        <h2>Compare Plans</h2>
        <div className="comparison-container">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>Basic</th>
                <th>Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Course Access</td>
                <td>Basic Only</td>
                <td>Full Access</td>
                <td>Custom + Full</td>
              </tr>
              <tr>
                <td>Lab Environment</td>
                <td>Limited</td>
                <td>Full Access</td>
                <td>Custom Labs</td>
              </tr>
              <tr>
                <td>Support Level</td>
                <td>Community</td>
                <td>Priority</td>
                <td>Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Plans; 