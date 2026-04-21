import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const Day07Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;
Day07Container.defaultProps = { theme };

export const TasksSection = styled.article`
  background: ${({ theme }) => `${theme.colors.surface}80`};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;
TasksSection.defaultProps = { theme };

export const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;
SectionHeader.defaultProps = { theme };

export const LoadingPill = styled.div`
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-weight: 700;
  background: ${({ theme }) => `${theme.colors.primary[500]}20`};
  color: ${({ theme }) => theme.colors.primary[400]};
  border: 1px solid ${({ theme }) => `${theme.colors.primary[500]}40`};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.3s ease;
`;
LoadingPill.defaultProps = { theme };

export const AddTaskForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const TasksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskItem = styled.li<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: ${({ theme }) => `${theme.colors.surface}40`};
  padding: 1.25rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => `${theme.colors.surface}60`};
    border-color: ${({ theme }) => `${theme.colors.primary[500]}40`};
    transform: translateX(8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;
TaskItem.defaultProps = { theme };

export const Day07Footer = styled.footer`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ConceptCard = styled.div`
  background: ${({ theme }) => `${theme.colors.surface}30`};
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
  }

  p {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }

  pre {
    margin-top: 1.5rem;
    background: #00000080;
    padding: 1.25rem;
    border-radius: 12px;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.primary[300]};
    overflow-x: auto;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  }
`;
ConceptCard.defaultProps = { theme };
