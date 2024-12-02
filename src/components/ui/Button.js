import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      className={`cyber-button ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <div className="button-loader">
          <span className="loader-dot"></span>
          <span className="loader-dot"></span>
          <span className="loader-dot"></span>
        </div>
      ) : children}
    </button>
  );
};

export default Button; 