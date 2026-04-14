import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
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
