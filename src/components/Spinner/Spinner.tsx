import React from 'react';
import './Spinner.css';

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-container" role="status" aria-label="loading">
      <div className="spinner"></div>
    </div>
  );
};
