import React from 'react';
import { Tabs } from '@/components/Tabs';
import './WeatherTabs.css';

interface WeatherTabsProps {
  children: React.ReactNode; // Current weather content
}

export const WeatherTabs: React.FC<WeatherTabsProps> = ({ children }) => {
  return (
    <Tabs defaultValue="current" className="weather-tabs">
      <Tabs.List className="weather-tabs-list">
        <Tabs.Tab id="current">Current</Tabs.Tab>
        <Tabs.Tab id="forecast">Forecast</Tabs.Tab>
        <Tabs.Tab id="details">Details</Tabs.Tab>
      </Tabs.List>

      <div className="weather-tabs-content">
        <Tabs.Panel id="current">
          {children}
        </Tabs.Panel>

        <Tabs.Panel id="forecast">
          <div className="forecast-placeholder">
            <h3>7-Day Forecast</h3>
            <div className="forecast-grid">
              {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ].map(day => (
                <div key={day} className="forecast-day">
                  <span className="day-name">{day}</span>
                  <div className="day-icon">⛅</div>
                  <span className="day-temp">22°C</span>
                </div>
              ))}
            </div>
            <p className="mock-note">Note: This is a placeholder for the weekly forecast view.</p>
          </div>
        </Tabs.Panel>

        <Tabs.Panel id="details">
          <div className="details-placeholder">
            <h3>Weather Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">45%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">12 km/h</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">1012 hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">10 km</span>
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </div>
    </Tabs>
  );
};
