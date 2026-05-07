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
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
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

export const SectionFooter = styled.footer`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
SectionFooter.defaultProps = { theme };

export const LoadingPill = styled.div`
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-weight: 700;
  background: ${({ theme }) => `${theme.colors.primary[600]}40`};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => `${theme.colors.primary[500]}80`};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
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

export const TaskItem = styled.article<{ $completed?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => `${theme.colors.primary[500]}60`};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;
TaskItem.defaultProps = { theme };

export const TaskHeader = styled.header`
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const TaskFooter = styled.footer`
  padding: 0.75rem 1.25rem;
  background: ${({ theme }) => `${theme.colors.surfaceLight}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

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
  background: ${({ theme }) => theme.colors.surface};
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
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
  }

  p {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.neutral[200]};
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
