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
    localStorage.setItem('token', JSON.stringify('fake-token'));
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
  
  it('should not show suggestions after a city is selected', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'Lond');

    const suggestion = await screen.findByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    await user.click(suggestion);

    // Weather should be displayed
    expect(await screen.findByRole('heading', { name: /london/i })).toBeInTheDocument();

    // The suggestions list should NOT be present
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    // Wait for more than the debounce time (300ms) to ensure it doesn't reappear
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should navigate suggestions with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    // Wait for suggestions to appear
    await screen.findByRole('listbox', {}, { timeout: 3000 });
    const suggestions = screen.getAllByRole('option');

    // Initially none selected
    expect(suggestions[0]).not.toHaveClass('active');

    // ArrowDown should select first suggestion
    await user.keyboard('{ArrowDown}');
    expect(suggestions[0]).toHaveClass('active');
    expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);

    // ArrowDown again should select second suggestion
    await user.keyboard('{ArrowDown}');
    expect(suggestions[1]).toHaveClass('active');
    expect(input).toHaveAttribute('aria-activedescendant', suggestions[1].id);

    // ArrowUp should go back to first suggestion
    await user.keyboard('{ArrowUp}');
    expect(suggestions[0]).toHaveClass('active');
  });

  it('should select suggestion with Enter key', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    // Wait for suggestions to appear
    await screen.findByRole('listbox', {}, { timeout: 3000 });
    const suggestions = screen.getAllByRole('option');

    // Navigate to first suggestion and press Enter
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    // Weather should be displayed for the first suggestion
    expect(await screen.findByRole('heading', { name: /london/i })).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should close suggestions with Escape key', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    // Wait for suggestions to appear
    await screen.findByRole('listbox', {}, { timeout: 3000 });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Press Escape
    await user.keyboard('{Escape}');

    // Suggestions should be closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
