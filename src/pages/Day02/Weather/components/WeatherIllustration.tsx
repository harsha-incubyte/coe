import React from 'react';
import Sun from './Sun';
import Cloud from './Cloud';
import './WeatherIllustration.css';

interface WeatherIllustrationProps {
  weatherCode: number;
  isDay: boolean;
  children?: React.ReactNode;
}

const WeatherIllustration: React.FC<WeatherIllustrationProps> = ({ weatherCode, isDay, children }) => {
  const getSkyColor = () => {
    if (!isDay) return 'linear-gradient(to bottom, #0f172a, #1e293b)'; // Night
    if (weatherCode >= 3) return 'linear-gradient(to bottom, #94a3b8, #cbd5e1)'; // Overcast Day
    
    // Clear / Mainly clear Day - Brighter and Whiter
    return 'linear-gradient(to bottom, #7dd3fc, #f0f9ff)'; 
  };

  return (
    <div className="weather-canvas" style={{ background: getSkyColor() }}>
      <div className="illustration-container">
        <div className="sun-layer">
          <Sun 
            isNight={!isDay} 
            opacity={weatherCode >= 3 ? 0.3 : 1}
            scale={weatherCode >= 3 ? 0.8 : 1.2}
          />
        </div>

        <div className="clouds-layer">
          {weatherCode === 0 && (
            <Cloud opacity={0.3} scale={1.8} style={{ top: '15%', left: '5%' }} />
          )}

          {weatherCode === 1 && (
            <>
              <Cloud opacity={0.6} scale={1.3} style={{ top: '25%', left: '45%' }} />
              <Cloud opacity={0.4} scale={0.9} style={{ top: '8%', left: '10%' }} />
            </>
          )}

          {weatherCode === 2 && (
            <>
              <Cloud opacity={0.8} scale={1.5} style={{ top: '35%', left: '25%' }} />
              <Cloud opacity={0.7} scale={1.1} style={{ top: '15%', left: '55%' }} />
              <Cloud opacity={0.5} scale={1.7} style={{ top: '5%', left: '-10%' }} />
            </>
          )}

          {weatherCode >= 3 && (
            <>
              <Cloud color="#f8fafc" opacity={0.9} scale={2.2} style={{ top: '15%', left: '-10%' }} />
              <Cloud color="#f1f5f9" opacity={0.9} scale={2.5} style={{ top: '30%', left: '35%' }} />
              <Cloud color="#f8fafc" opacity={0.8} scale={2} style={{ top: '5%', left: '60%' }} />
              <Cloud color="#e2e8f0" opacity={0.9} scale={2.8} style={{ top: '45%', left: '10%' }} />
            </>
          )}
        </div>
      </div>
      
      <div className="canvas-content-overlay">
        {children}
      </div>
    </div>
  );
};

export default WeatherIllustration;
