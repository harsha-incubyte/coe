import React from 'react';
import { Navigate } from 'react-router-dom';

export const Weather: React.FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/day-02/login" replace />;
  }

  return <div>Weather Dashboard</div>;
};
