import React from 'react';

const LabCard = ({ lab }) => {
  return (
    <div className="lab-card">
      <h3>{lab.title}</h3>
      <p>{lab.description}</p>
      {/* Add any other lab details you want to display */}
    </div>
  );
};

export default LabCard; 