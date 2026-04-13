import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render Day 01 and Day 02 links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Day 01/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 02/i)).toBeInTheDocument();
  });

  it('should render the COE logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/COE/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Incubyte Logo/i)).toBeInTheDocument();
  });
});
