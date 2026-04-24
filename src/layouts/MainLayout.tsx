import React from 'react';
import { Navbar } from '@/design-system/organisms/Navbar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LayoutProvider } from '@/design-system/layout/LayoutContext';
import { useLayout } from '@/design-system/layout/useLayout';
import { 
  LayoutContainer, 
  ContentContainer, 
  SkipLink, 
  DesktopIndicator 
} from './MainLayout.styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const { isFullWidth } = useLayout();

  return (
    <LayoutContainer $fullWidth={isFullWidth}>
      {isDesktop && (
        <DesktopIndicator>
          Desktop Optimized
        </DesktopIndicator>
      )}
      <SkipLink href="#main-content">
        Skip to content
      </SkipLink>
      <Navbar />
      <ContentContainer id="main-content" tabIndex={-1} $fullWidth={isFullWidth}>
        {children}
      </ContentContainer>
    </LayoutContainer>
  );
};

const MainLayout: React.FC<MainLayoutProps> = (props) => (
  <LayoutProvider>
    <MainLayoutContent {...props} />
  </LayoutProvider>
);

export default MainLayout;
