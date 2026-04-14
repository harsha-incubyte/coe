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

  it('should render search input', () => {
    setup();
    expect(screen.getByPlaceholderText(/search for a city/i)).toBeInTheDocument();
  });

  it('should show suggestions after typing 3+ characters and waiting', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    const suggestion = await screen.findByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    expect(suggestion).toBeInTheDocument();
  });

  it('should fetch and display weather data after selecting a suggestion', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    const suggestion = await screen.findByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    await user.click(suggestion);

    expect(await screen.findByRole('heading', { name: /london/i })).toBeInTheDocument();
    expect(screen.getByText(/15/i)).toBeInTheDocument();
    expect(screen.getByText(/mainly clear/i)).toBeInTheDocument();
  });

  it('should show "City not found" if invalid city is typed', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'Atlantis');

    expect(await screen.findByText(/city not found/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
