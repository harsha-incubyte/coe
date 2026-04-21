import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const Container = styled.div`
  padding-bottom: 4rem;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  h1 {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.text} 0%, ${({ theme }) => theme.colors.primary[400]} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const PlaygroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ExerciseSection = styled.section`
  border-radius: 20px;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(192, 132, 252, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(192, 132, 252, 0.4);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  p {
    line-height: 1.8;
    margin-bottom: 2.5rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
ExerciseSection.defaultProps = { theme };

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;

  h2 {
    margin: 0;
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text};
  }
`;
CardHeader.defaultProps = { theme };

export const LiveRegionPlayground = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.03);
`;

export const ButtonGroupVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`;

export const LiveOutput = styled.div`
  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.75rem;
    letter-spacing: 0.1em;
  }
`;
LiveOutput.defaultProps = { theme };

export const AnnouncementBox = styled.div`
  background: #000;
  border: 1px dashed rgba(192, 132, 252, 0.3);
  padding: 1.5rem;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 0.9375rem;
  color: #c084fc;
  min-height: 5rem;
  display: flex;
  align-items: center;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
`;
AnnouncementBox.defaultProps = { theme };


