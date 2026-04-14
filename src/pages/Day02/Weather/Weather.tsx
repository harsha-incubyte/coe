import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import WeatherIllustration from './components/WeatherIllustration';
import './Weather.css';

interface WeatherData {
  city: string;
  country: string;
  admin1?: string;
  timezone: string;
  elevation: number;
  temperature: number;
  condition: string;
  weatherCode: number;
  isDay: boolean;
}

interface Suggestion {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
}

const mapWeatherCode = (code: number) => {
  const codes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
  };
  return codes[code] || 'Cloudy';
};

export const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (city.length < 3) {
      setSuggestions([]);
      setError(null);
      return;
    }

    const handler = setTimeout(async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
          setSuggestions([]);
          setError('City not found');
          return;
        }

        setError(null);
        setSuggestions(data.results);
        setShowSuggestions(true);
      } catch (err) {
        setError('Error fetching suggestions');
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [city]);

  useEffect(() => {
    if (!weather?.timezone) return;
    
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: weather.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [weather?.timezone]);

  const handleSelectSuggestion = async (suggestion: Suggestion) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${suggestion.latitude}&longitude=${suggestion.longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: suggestion.name,
        country: suggestion.country,
        admin1: suggestion.admin1,
        timezone: suggestion.timezone,
        elevation: suggestion.elevation,
        temperature: weatherData.current_weather.temperature,
        condition: mapWeatherCode(weatherData.current_weather.weathercode),
        weatherCode: weatherData.current_weather.weathercode,
        isDay: weatherData.current_weather.is_day === 1,
      });
    } catch (err) {
      setError('Error loading weather data');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/day-02/login" replace />;
  }

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <div className="search-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => city.length >= 3 && setShowSuggestions(true)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Fetching weather...' : 'Get Weather'}
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s) => (
              <li key={s.id} onClick={() => handleSelectSuggestion(s)}>
                {s.name}, {s.admin1 ? `${s.admin1}, ` : ''}{s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <div className="loading-state">Updating weather...</div>}
      {error && <div className="error-message">{error}</div>}

      {weather && !loading && (
        <div className="weather-content">
          <WeatherIllustration weatherCode={weather.weatherCode} isDay={weather.isDay} />
          
          <div className="weather-card">
            <div className="card-header">
              <div className="location-info">
                <h2>{weather.city}</h2>
                <p className="location-sub">{weather.admin1 ? `${weather.admin1}, ` : ''}{weather.country}</p>
              </div>
              <div className="time-info">
                <span className="local-time">{localTime}</span>
              </div>
            </div>

            <div className="weather-stats">
              <p className="temp">{Math.round(weather.temperature)}°C</p>
              <p className="condition">{weather.condition}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
