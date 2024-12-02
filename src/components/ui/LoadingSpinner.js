import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="cyber-spinner">
        <div className="spinner-inner">
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-circle">●</div>
        </div>
        <span className="loading-text">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 