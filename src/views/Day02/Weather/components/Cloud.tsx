import React from 'react';

interface CloudProps {
  opacity?: number;
  scale?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Cloud: React.FC<CloudProps> = ({ opacity = 1, scale = 1, color = '#FFFFFF', style }) => {
  return (
    <svg 
      width="120" 
      height="80" 
      viewBox="0 0 120 80" 
      className="weather-cloud" 
      style={{ 
        opacity, 
        transform: `scale(${scale})`, 
        fill: color,
        ...style 
      }}
    >
      <path d="M100 50 a20 20 0 1 1 -40 0 a20 20 0 1 1 -40 0 a20 20 0 1 1 0 -40 a20 20 0 1 1 40 0 a20 20 0 1 1 40 40 z" />
    </svg>
  );
};

export default Cloud;
