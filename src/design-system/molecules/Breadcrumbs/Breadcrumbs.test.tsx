import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs';


describe('Breadcrumbs Molecule', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' }, // Current page
  ];

  it('renders breadcrumb items correctly', () => {
    render(
      
        <Breadcrumbs items={items} />
      
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders links for non-active items', () => {
    render(
      
        <Breadcrumbs items={items} />
      
    );
    
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
    
    // Active item should not be a link
    expect(screen.queryByRole('link', { name: 'Settings' })).not.toBeInTheDocument();
  });

  it('includes separators between items', () => {
    render(
      
        <Breadcrumbs items={items} separator=">" />
      
    );
    
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('is accessible with nav and aria-label', () => {
    render(
      
        <Breadcrumbs items={items} />
      
    );
    
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
