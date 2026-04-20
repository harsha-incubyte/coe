import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';
import FizzBuzzUI from '@/components/FizzBuzz';

describe('FizzBuzzUI Component', () => {
  it('renders a title, an input field and a result area', () => {
    render(
      <ThemeProvider theme={theme}>
        <FizzBuzzUI />
      </ThemeProvider>
    );
    expect(screen.getByText('FizzBuzz Generator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a number')).toBeInTheDocument();
  });

  it('displays the correct FizzBuzz output sequence for the entered number', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <FizzBuzzUI />
      </ThemeProvider>
    );
    const inputField = screen.getByPlaceholderText('Enter a number');
    await user.type(inputField, '5');
    
    // For 5, we expect 1, 2, Fizz, 4, Buzz
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Fizz')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Buzz')).toBeInTheDocument();
  });
});

