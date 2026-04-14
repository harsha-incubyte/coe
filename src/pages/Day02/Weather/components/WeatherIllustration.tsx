import React from 'react';
import Sun from './Sun';
import Cloud from './Cloud';
import './WeatherIllustration.css';

interface WeatherIllustrationProps {
  weatherCode: number;
  isDay: boolean;
}

const WeatherIllustration: React.FC<WeatherIllustrationProps> = ({ weatherCode, isDay }) => {
  const getSkyColor = () => {
    if (!isDay) return 'linear-gradient(to bottom, #1e293b, #0f172a)';
    if (weatherCode >= 3) return 'linear-gradient(to bottom, #94a3b8, #64748b)';
    return 'linear-gradient(to bottom, #3b82f6, #60a5fa)';
  };

  return (
    <div className="weather-canvas" style={{ background: getSkyColor() }}>
      <div className="illustration-container">
        <div className="sun-layer">
          <Sun 
            isNight={!isDay} 
            opacity={weatherCode >= 3 ? 0.3 : 1}
            scale={weatherCode >= 3 ? 0.8 : 1}
          />
        </div>

        {weatherCode === 0 && (
          <div className="clouds-layer">
            <Cloud opacity={0.15} scale={1.5} style={{ top: '20%', left: '10%' }} />
          </div>
        )}

        {weatherCode === 1 && (
          <div className="clouds-layer">
            <Cloud opacity={0.6} scale={1.2} style={{ top: '30%', left: '50%' }} />
            <Cloud opacity={0.3} scale={0.8} style={{ top: '10%', left: '15%' }} />
          </div>
        )}

        {weatherCode === 2 && (
          <div className="clouds-layer">
            <Cloud opacity={0.8} scale={1.4} style={{ top: '40%', left: '30%' }} />
            <Cloud opacity={0.8} scale={1.2} style={{ top: '20%', left: '60%' }} />
            <Cloud opacity={0.5} scale={1.6} style={{ top: '10%', left: '-5%' }} />
          </div>
        )}

        {weatherCode >= 3 && (
          <div className="clouds-layer">
            <Cloud color="#cbd5e1" opacity={0.9} scale={2} style={{ top: '20%', left: '0%' }} />
            <Cloud color="#94a3b8" opacity={0.9} scale={2.2} style={{ top: '35%', left: '40%' }} />
            <Cloud color="#cbd5e1" opacity={0.8} scale={1.8} style={{ top: '10%', left: '70%' }} />
            <Cloud color="#64748b" opacity={0.9} scale={2.5} style={{ top: '50%', left: '15%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherIllustration;
