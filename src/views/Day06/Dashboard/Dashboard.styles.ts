import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const DashboardContainer = styled.div`
  padding-bottom: 4rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 5rem;

  h1 {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.text} 0%, ${({ theme }) => theme.colors.primary[500]} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const DashboardMainContent = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
DashboardMainContent.defaultProps = { theme };

export const PanelInner = styled.div`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
PanelInner.defaultProps = { theme };

export const DocsList = styled.ul`
  padding-left: 1.5rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};

  li strong {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
DocsList.defaultProps = { theme };
