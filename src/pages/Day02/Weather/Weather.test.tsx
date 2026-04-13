import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../lib/msw/server';
import { Weather } from './Weather';

describe('Weather Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should redirect to login if no token is present in localStorage', () => {
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
          <Route path="/day-02/login" element={<div>Login Page</div>} />
        </Routes>
      </Router>
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('should show loading state and then display weather data', async () => {
    localStorage.setItem('token', 'fake-token');
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/pune/i)).toBeInTheDocument();
    expect(screen.getByText(/32/i)).toBeInTheDocument();
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
  });

  it('should show error message if the weather API fails', async () => {
    server.use(
      http.get('/api/weather', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    localStorage.setItem('token', 'fake-token');
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
        </Routes>
      </Router>
    );

    expect(await screen.findByText(/error loading weather data/i)).toBeInTheDocument();
  });
});
