import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store';
import { useToast } from '@/hooks/useToast';
import { Input } from '@/design-system/atoms/Input';
import { useBoolean } from '@/hooks/useBoolean';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import WeatherIllustration from './components/WeatherIllustration';
import { WeatherTabs } from './components/WeatherTabs';
import { mapWeatherCode } from './WeatherUtils';
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

export const Weather: React.FC = () => {

  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, { setTrue: startLoading, setFalse: stopLoading }] = useBoolean(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen: showSuggestions, onOpen: openSuggestions, onClose: closeSuggestions } = useDisclosure(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [localTime, setLocalTime] = useState<string>('');
  const skipNextSuggestionsRef = useRef(false);

  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Session expired. Please login again.', 'warning');
    }
  }, [isAuthenticated, showToast]);

  useOnClickOutside(searchContainerRef, () => {
    closeSuggestions();
    setActiveSuggestionIndex(-1);
  });

  useEffect(() => {
    if (activeSuggestionIndex >= 0) {
      const activeElement = document.getElementById(`suggestion-${suggestions[activeSuggestionIndex].id}`);
      if (activeElement && typeof activeElement.scrollIntoView === 'function') {
        activeElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [activeSuggestionIndex, suggestions]);

  useEffect(() => {
    if (skipNextSuggestionsRef.current) {
      skipNextSuggestionsRef.current = false;
      return;
    }

    if (city.length < 3) {
      setSuggestions([]);
      setError(null);
      setActiveSuggestionIndex(-1);
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
        openSuggestions();
        setActiveSuggestionIndex(-1);
      } catch {
        setError('Error fetching suggestions');
      }
    }, 300);

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
    skipNextSuggestionsRef.current = true;
    setCity(suggestion.name);
    closeSuggestions();
    setActiveSuggestionIndex(-1);
    startLoading();
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
    } catch {
      setError('Error loading weather data');
    } finally {
      stopLoading();
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!showSuggestions && suggestions.length > 0) {
        openSuggestions();
        setActiveSuggestionIndex(0);
      } else {
        setActiveSuggestionIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      closeSuggestions();
      setActiveSuggestionIndex(-1);
    }
  };


  return (
    <div className="weather-dashboard-unified">
      <div className="search-section">
        <div className="search-container" ref={searchContainerRef}>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <Input

              label="Search for a city"
              hideLabel
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => city.length >= 3 && openSuggestions()}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-haspopup="listbox"
              aria-controls="suggestions-listbox"
              aria-activedescendant={
                activeSuggestionIndex >= 0 
                  ? `suggestion-${suggestions[activeSuggestionIndex].id}` 
                  : undefined
              }
              fullWidth
            />
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <ul 
              id="suggestions-listbox"
              className="suggestions-list"
              role="listbox"
            >
              {suggestions.map((s, index) => (
                <li 
                  key={s.id} 
                  id={`suggestion-${s.id}`}
                  onClick={() => handleSelectSuggestion(s)}
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                  className={index === activeSuggestionIndex ? 'active' : ''}
                >
                  <span className="suggestion-name">{s.name}</span>
                  <span className="suggestion-meta">{s.admin1 ? `${s.admin1}, ` : ''}{s.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading && <div className="status-overlay">Updating weather...</div>}
      {error && <div className="error-overlay">{error}</div>}

      {weather && !loading && (
        <WeatherTabs>
          <WeatherIllustration weatherCode={weather.weatherCode} isDay={weather.isDay}>
            <div className="weather-overlay-data">
              <div className="data-header">
                <div className="city-info">
                  <h2 className="city-name">{weather.city}</h2>
                  <p className="city-meta">{weather.admin1 ? `${weather.admin1}, ` : ''}{weather.country}</p>
                </div>
                <div className="time-pill">{localTime}</div>
              </div>

              <div className="data-footer">
                <div className="temp-display">
                  <span className="temp-value">{Math.round(weather.temperature)}</span>
                  <span className="temp-unit">°C</span>
                </div>
                <div className="condition-label">{weather.condition}</div>
              </div>
            </div>
          </WeatherIllustration>
        </WeatherTabs>
      )}
    </div>
  );
};
