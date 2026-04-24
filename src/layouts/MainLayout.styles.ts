import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const LayoutContainer = styled.div<{ $fullWidth?: boolean }>`
  min-height: 100vh;
  height: ${({ $fullWidth }) => ($fullWidth ? '100vh' : 'auto')};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: ${({ $fullWidth }) => ($fullWidth ? 'hidden' : 'visible')};
`;
LayoutContainer.defaultProps = { theme };

export const ContentContainer = styled.main<{ $fullWidth?: boolean }>`
  max-width: ${({ $fullWidth }) => ($fullWidth ? 'none' : '1200px')};
  margin: ${({ $fullWidth }) => ($fullWidth ? '0' : '0 auto')};
  padding: ${({ theme, $fullWidth }) => ($fullWidth ? '0' : theme.spacing['2xl'])};
  outline: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.spacing['3xl']}) {
     padding: ${({ theme, $fullWidth }) => ($fullWidth ? '0' : theme.spacing.lg)};
  }
`;
ContentContainer.defaultProps = { theme };

export const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 0;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  z-index: ${({ theme }) => theme.zIndices.skipLink};
  transition: top 0.3s ease;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} 0;

  &:focus {
    top: 0;
    outline: 2px solid white;
    outline-offset: -4px;
  }
`;
SkipLink.defaultProps = { theme };

export const DesktopIndicator = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  border-radius: 4px;
  z-index: ${({ theme }) => theme.zIndices.docked};
  pointer-events: none;
`;
DesktopIndicator.defaultProps = { theme };
