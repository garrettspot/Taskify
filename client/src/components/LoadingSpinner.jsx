import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
      <div>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
