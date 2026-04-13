import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
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
});
