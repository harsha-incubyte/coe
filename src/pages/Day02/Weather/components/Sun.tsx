import React from 'react';

interface SunProps {
  opacity?: number;
  scale?: number;
  isNight?: boolean;
}

const Sun: React.FC<SunProps> = ({ opacity = 1, scale = 1, isNight = false }) => {
  if (isNight) {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className="sun-moon" style={{ opacity, transform: `scale(${scale})` }}>
        <circle cx="50" cy="50" r="40" fill="#E2E8F0" />
        <circle cx="65" cy="35" r="40" fill="#0F172A" />
      </svg>
    );
  }

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="sun-moon" style={{ opacity, transform: `scale(${scale})` }}>
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#sunGlow)" />
    </svg>
  );
};

export default Sun;
