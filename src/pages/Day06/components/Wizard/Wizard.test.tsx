import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { Wizard } from './Wizard';

describe('Wizard Component (Split Context Pattern)', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should navigate through steps', () => {
    render(<Wizard />);
    
    expect(screen.getByText(/Scan for Devices/i)).toBeInTheDocument();
    
    const nextBtn = screen.getByRole('button', { name: /next step/i });
    fireEvent.click(nextBtn);
    
    expect(screen.getByText(/Network Settings/i)).toBeInTheDocument();
    
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Configuration/i)).toBeInTheDocument();
  });

  it('should update state via inputs', async () => {
    render(<Wizard />);
    
    const input = screen.getByPlaceholderText(/e.g. DEV-8821/i);
    fireEvent.change(input, { target: { value: 'MY-DEVICE-123' } });
    
    expect(input).toHaveValue('MY-DEVICE-123');
  });

  it('should prove performance isolation (NextButton does not re-render on input)', () => {
    const consoleSpy = vitest.spyOn(console, 'log');
    
    render(<Wizard />);
    
    // Initial render count for NextButton
    const initialLogCount = consoleSpy.mock.calls.filter(call => call[0] === 'NextButton rendered').length;
    expect(initialLogCount).toBe(1);
    
    // Change input (triggers state update in StateContext)
    const input = screen.getByPlaceholderText(/e.g. DEV-8821/i);
    fireEvent.change(input, { target: { value: 'some value' } });
    fireEvent.change(input, { target: { value: 'another value' } });

    // Check log count again
    const finalLogCount = consoleSpy.mock.calls.filter(call => call[0] === 'NextButton rendered').length;
    
    // It should STILL be 1 because NextButton is memoized and only depends on DispatchContext (which is stable)
    expect(finalLogCount).toBe(1);
  });
});
