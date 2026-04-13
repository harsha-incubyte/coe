import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  it('should render search input and "Get Weather" button', () => {
    localStorage.setItem('token', 'fake-token');
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
        </Routes>
      </Router>
    );

    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get weather/i })).toBeInTheDocument();
  });

  it('should search and display weather for London', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'fake-token');
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
        </Routes>
      </Router>
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole('button', { name: /get weather/i });

    await user.type(input, 'London');
    await user.click(button);

    expect(screen.getAllByText(/fetching weather/i).length).toBeGreaterThan(0);

    expect(await screen.findByText(/weather in London/i)).toBeInTheDocument();
    expect(screen.getByText(/15/i)).toBeInTheDocument();
  });

  it('should show "City not found" for invalid cities', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'fake-token');
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
        </Routes>
      </Router>
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole('button', { name: /get weather/i });

    await user.type(input, 'Atlantis');
    await user.click(button);

    expect(await screen.findByText(/city not found/i)).toBeInTheDocument();
  });
});
