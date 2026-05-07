import { render, screen } from '@/design-system/test-utils';
import Day04 from './index';
import { describe, it, expect } from 'vitest';

describe('Day04 Page', () => {
  it('should render atomic Input components instead of legacy ones', async () => {
    // Arrange
    render(<Day04 />);
    
    // Act
    const launchButton = screen.getByRole('button', { name: /launch modal/i });
    launchButton.click();

    // Assert
    const fullNameInput = await screen.findByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveAttribute('id');
    
    const environmentInput = screen.getByLabelText(/environment/i);
    expect(environmentInput).toBeInTheDocument();
    expect(environmentInput).toHaveAttribute('aria-describedby');
  });

  it('should have the correct data-testid on the main container', () => {
    // Arrange
    render(<Day04 />);

    // Assert
    expect(screen.getByTestId('day04-page')).toBeInTheDocument();
  });
});
