import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardHeader } from './CardHeader';

describe('CardHeader Molecule', () => {
  it('renders title correctly', () => {
    render(<CardHeader title="Card Title" />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders subtitle correctly', () => {
    render(<CardHeader title="Title" subtitle="This is a subtitle" />);
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('renders actions correctly', () => {
    render(
      <CardHeader 
        title="Title" 
        actions={<button>Edit</button>} 
      />
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('is accessible with proper heading level if needed', () => {
    // We can check if it uses a heading element
    render(<CardHeader title="Section Title" />);
    expect(screen.getByRole('heading', { name: 'Section Title' })).toBeInTheDocument();
  });
});
