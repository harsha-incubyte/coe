import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { Weather } from './Weather'; // Named import for raw component
import { withAuth } from '@/components/withAuth/withAuth';
import { vitest } from 'vitest';

const mockShowToast = vitest.fn();
vitest.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

describe('Weather Component', () => {
  const ProtectedWeather = withAuth(Weather);

  beforeEach(() => {
    localStorage.clear();
    mockShowToast.mockClear();
  });

  const setup = () => {
    localStorage.setItem('token', JSON.stringify('fake-token'));
    // We test the ProtectedWeather to ensure HOC works with it
    return render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<ProtectedWeather />} />
          <Route path="/day-02/login" element={<div>Authentication Required</div>} />
        </Routes>
      </Router>
    );
  };

  it('should show authentication required if no token is present', () => {
    localStorage.clear();
    render(
      <Router initialEntries={['/day-02/weather']}>
        <Routes>
          <Route path="/day-02/weather" element={<ProtectedWeather />} />
          <Route path="/day-02/login" element={<div>Authentication Required</div>} />
        </Routes>
      </Router>
    );

    expect(screen.getByText(/Authentication Required/i)).toBeInTheDocument();
  });

  it('should render search input when authenticated', () => {
    setup();
    expect(screen.getByPlaceholderText(/search for a city/i)).toBeInTheDocument();
  });

  it('should show suggestions after typing 3+ characters and waiting', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    const suggestions = await screen.findAllByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('should fetch and display weather data after selecting a suggestion', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search for a city/i);
    await user.type(input, 'London');

    const suggestions = await screen.findAllByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    await user.click(suggestions[0]);

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

    const suggestions = await screen.findAllByText(/London/i, { selector: '.suggestion-name' }, { timeout: 3000 });
    await user.click(suggestions[0]);

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

  it('should show toast notification on logout and fallback to login prompt', async () => {
    const user = userEvent.setup();
    setup();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    expect(mockShowToast).toHaveBeenCalledWith('You have been logged out successfully.', 'info');
    expect(await screen.findByText(/Authentication Required/i)).toBeInTheDocument();
  });
});
