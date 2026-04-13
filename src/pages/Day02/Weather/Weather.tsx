import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
}

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Error loading weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [token]);

  if (!token) {
    return <Navigate to="/day-02/login" replace />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return null;

  return (
    <div className="weather-dashboard">
      <h2>Weather in {weather.city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
};
