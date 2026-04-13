import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content-container">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
