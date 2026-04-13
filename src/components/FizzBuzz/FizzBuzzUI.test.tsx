import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FizzBuzzUI from '@/components/FizzBuzz';

describe('FizzBuzzUI Component', () => {
  it('renders a title, an input field and a result area', () => {
    render(<FizzBuzzUI />);
    expect(screen.getByText('FizzBuzz Generator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a number')).toBeInTheDocument();
  });

  it('displays the correct FizzBuzz output sequence for the entered number', () => {
    render(<FizzBuzzUI />);
    const inputId = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(inputId, { target: { value: '5' } });
    
    // For 5, we expect 1, 2, Fizz, 4, Buzz
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Fizz')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Buzz')).toBeInTheDocument();
  });
});
