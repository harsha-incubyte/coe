import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const Day07Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;
Day07Container.defaultProps = { theme };

export const TasksSection = styled.section`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;
TasksSection.defaultProps = { theme };

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
`;
SectionHeader.defaultProps = { theme };

export const LoadingPill = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;

export const AddTaskForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TasksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TaskItem = styled.li<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(15, 23, 42, 0.4);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  .task-title {
    font-size: 1rem;
    color: ${({ $completed, theme }) => $completed ? theme.colors.textMuted : theme.colors.text};
    text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
    transition: color 0.2s ease;
  }
`;
TaskItem.defaultProps = { theme };

export const Day07Footer = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ConceptCard = styled.div`
  background: rgba(30, 41, 59, 0.3);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #818cf8;
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }

  pre {
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.75rem;
    color: #38bdf8;
    overflow-x: auto;
  }
`;
ConceptCard.defaultProps = { theme };
