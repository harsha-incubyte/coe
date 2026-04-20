import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalFooter } from './ModalFooter';

describe('ModalFooter Molecule', () => {
  it('renders children correctly', () => {
    render(
      <ModalFooter>
        <button>Cancel</button>
        <button>Submit</button>
      </ModalFooter>
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('aligns content based on align prop', () => {
    const { rerender } = render(<ModalFooter align="flex-start">Content</ModalFooter>);
    expect(screen.getByText('Content')).toHaveStyle('justify-content: flex-start');

    rerender(<ModalFooter align="flex-end">Content</ModalFooter>);
    expect(screen.getByText('Content')).toHaveStyle('justify-content: flex-end');
  });
});
