import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div className="main-layout">
      {isDesktop && (
        <div 
          className="desktop-indicator" 
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            padding: '4px 8px',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '10px',
            borderRadius: '4px',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          Desktop Optimized
        </div>
      )}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="content-container" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
