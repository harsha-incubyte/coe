import React from 'react';
import { Navbar } from '@/design-system/organisms/Navbar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { 
  LayoutContainer, 
  ContentContainer, 
  SkipLink, 
  DesktopIndicator 
} from './MainLayout.styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <LayoutContainer>
      {isDesktop && (
        <DesktopIndicator>
          Desktop Optimized
        </DesktopIndicator>
      )}
      <SkipLink href="#main-content">
        Skip to content
      </SkipLink>
      <Navbar />
      <ContentContainer id="main-content" tabIndex={-1}>
        {children}
      </ContentContainer>
    </LayoutContainer>
  );
};

export default MainLayout;
