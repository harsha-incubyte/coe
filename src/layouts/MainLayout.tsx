import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

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
      <style>{`
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .main-layout {
          min-height: 100vh;
          background-color: #fafafa;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
