import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  error,
  success,
  helperText,
  type = 'text',
  ...props
}) => {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      <div className={`input-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''}`}>
        <input
          type={type}
          className="form-input"
          {...props}
        />
        {(error || success) && (
          <span className="input-icon">
            {error ? '✕' : '✓'}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <span className={`helper-text ${error ? 'error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default FormInput; 