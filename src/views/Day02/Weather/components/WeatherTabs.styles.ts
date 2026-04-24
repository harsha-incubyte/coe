import styled, { keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const WeatherTabsContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};

  .tabs-list {
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .tab-button {
    background: none;
    border: none;
    color: ${({ theme }) => `${theme.colors.text}99`};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
    cursor: pointer;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => `${theme.colors.surfaceLight}4d`};
    }

    &.active {
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => `${theme.colors.surfaceLight}bf`};
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  }
`;

export const TabsContent = styled.div`
  min-height: 300px;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const Placeholder = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => `${theme.colors.surfaceLight}4d`}; // 0.3 opacity
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ForecastGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

export const ForecastDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.surfaceLight}80`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-width: 80px;

  .day-name {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .day-icon {
    font-size: 1.5rem;
  }

  .day-temp {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MockNote = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  text-align: center;
`;

TabsContent.defaultProps = { theme };
Placeholder.defaultProps = { theme };
ForecastGrid.defaultProps = { theme };
ForecastDay.defaultProps = { theme };
DetailsGrid.defaultProps = { theme };
MockNote.defaultProps = { theme };
WeatherTabsContainer.defaultProps = { theme };
