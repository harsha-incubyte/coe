import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CounterUI from '@/components/Counter';

describe('Counter component TDD', () => {
  it('renders Counter component with initial count of 0', () => {
    render(<CounterUI />);
    const countDisplay = screen.getByTestId('count-display');
    expect(countDisplay).toHaveTextContent('0');
  });

  it('increments the count when the increment button is clicked', () => {
    render(<CounterUI />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });

    fireEvent.click(incrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('1');
    
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('2');
  });

  it('decrements the count when the decrement button is clicked', () => {
    render(<CounterUI />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    fireEvent.click(decrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('-1');
  });

  it('resets the count to 0 when the reset button is clicked', () => {
    render(<CounterUI />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    // First increment to make it non-zero
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('1');

    // Then reset
    fireEvent.click(resetButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('0');
  });
});
