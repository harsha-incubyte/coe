import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatBlock } from './StatBlock';

describe('StatBlock Molecule', () => {
  it('renders label and value', () => {
    render(<StatBlock label="Humidity" value="45%" />);
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('renders optional icon', () => {
    render(<StatBlock label="Wind" value="12 km/h" icon={<span>🌬️</span>} />);
    expect(screen.getByText('🌬️')).toBeInTheDocument();
  });

  it('supports trend variants', () => {
    render(<StatBlock label="Revenue" value="$10,000" trend={{ value: '+5%', type: 'success' }} />);
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });
});
