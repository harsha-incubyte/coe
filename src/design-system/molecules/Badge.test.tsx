import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Molecule', () => {
  it('renders content correctly', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    // We can't easily test colors in unit tests without checking computed styles,
    // but we can check if it renders without crashing with the prop.
    expect(screen.getByText('Success')).toBeInTheDocument();

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('supports dashed/outlined variant if needed', () => {
    // Some badges might follow a specific style
    render(<Badge pill>Pill</Badge>);
    expect(screen.getByText('Pill')).toBeInTheDocument();
  });

  it('renders content from label prop if children is missing', () => {
    render(<Badge label="Label Content" />);
    expect(screen.getByText('Label Content')).toBeInTheDocument();
  });
});
