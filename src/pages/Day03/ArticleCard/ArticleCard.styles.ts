import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const StyledArticleCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  border-left: 4px solid ${({ theme }) => theme.colors.success};
`;


StyledArticleCard.defaultProps = { theme };

export const DateText = styled.time`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
DateText.defaultProps = { theme };

export const HeaderWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 0;

  header {
    margin-bottom: 0;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
HeaderWrapper.defaultProps = { theme };


export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex-grow: 1;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`;
CardContent.defaultProps = { theme };

export const CardFooter = styled.footer`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
CardFooter.defaultProps = { theme };

export const ReadMoreButton = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent[300]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent[100]};
    transform: translateX(4px);
  }

  &::after {
    content: ' →';
  }
`;
ReadMoreButton.defaultProps = { theme };


// Non-semantic version styles (reusing properties but on generic tags)
export const NonSemanticCard = styled.div`
  background: #1e293b;
  border: 1px solid #1e293b;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 4px solid #ef4444;
`;


export const NonSemanticHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #334155;
`;

export const NonSemanticTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

export const NonSemanticDate = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

export const NonSemanticBtn = styled.div`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: #1e293b;
  color: #6366f1;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #334155;
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #6366f1;
    color: white;
    transform: scale(1.05);
  }
`;


export const NonSemanticContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;

  p {
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

export const NonSemanticFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #334155;
`;

