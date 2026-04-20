import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const Day05Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DemoSection = styled.section<{ $fullWidth?: boolean; $glass?: boolean }>`
  padding: 2.5rem;
  border-radius: 24px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
  background: ${({ theme, $glass }) => $glass ? 'rgba(0, 0, 0, 0.2)' : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;
DemoSection.defaultProps = { theme };

export const SectionIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: block;
`;

export const AuditStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 16px;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
`;
StatusItem.defaultProps = { theme };

export const StatusDot = styled.div<{ $color: string; $glow?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  ${({ $glow, $color }) => $glow && `box-shadow: 0 0 10px ${$color};`}
`;

export const Pa11yReport = styled.div`
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;
Pa11yReport.defaultProps = { theme };

export const Pa11yHeader = styled.div`
  background: #1a1a1a;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const TerminalDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const TerminalTitle = styled.span`
  font-size: 0.75rem;
  color: #cbd5e1;
  margin-left: 0.5rem;
  text-transform: lowercase;
`;

export const Pa11yBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Pa11yLine = styled.div<{ $variant?: 'success' | 'default' }>`
  font-size: 0.8125rem;
  white-space: nowrap;
  color: ${({ theme, $variant }) => $variant === 'success' ? '#27c93f' : theme.colors.textSecondary};
`;
Pa11yLine.defaultProps = { theme };

export const TouchComparison = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const ComparisonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.05em;
  }
`;
ComparisonItem.defaultProps = { theme };

export const TouchBtnBad = styled.button`
  width: 24px;
  height: 24px;
  background: #374151;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

export const ContrastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const ContrastCard = styled.div<{ $variant: 'bad' | 'good' | 'hardened' }>`
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'bad':
        return `
          background: #27272a;
          color: #52525b;
        `;
      case 'good':
        return `
          background: #27272a;
          color: #e4e4e7;
        `;
      case 'hardened':
        return `
          background: #065f46;
          color: #fff;
          font-weight: 700;
        `;
    }
  }}
`;

export const ContrastMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.8;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;
ContrastMeta.defaultProps = { theme };
