import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { Weather } from './Weather';

describe('Weather Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const setup = () => {
    localStorage.setItem('token', 'fake-token');
    return render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<Weather />} />
          <Route path="/day-02/login" element={<div>Login Page</div>} />
        </Routes>
      </Router>
    );
  };

  it('should redirect to login if no token is present in localStorage', () => {
    localStorage.clear();
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
    setup();
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get weather/i })).toBeInTheDocument();
  });

  it('should show suggestions after typing 3+ characters and waiting', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/enter city/i);
    await user.type(input, 'London');

    // This will fail because the current Weather.tsx doesn't have autocomplete logic
    const suggestion = await screen.findByText(/London, England, United Kingdom/i, {}, { timeout: 2000 });
    expect(suggestion).toBeInTheDocument();
  });

  it('should fetch and display weather data after selecting a suggestion', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/enter city/i);
    await user.type(input, 'London');

    const suggestion = await screen.findByText(/London, England, United Kingdom/i, {}, { timeout: 2000 });
    await user.click(suggestion);

    expect(await screen.findByRole('heading', { name: /london/i })).toBeInTheDocument();
    expect(screen.getByText(/15°C/i)).toBeInTheDocument();
  });
});
