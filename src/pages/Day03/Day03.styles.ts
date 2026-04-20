import styled from 'styled-components';

export const Day03Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease;

    &.active {
      color: ${({ theme }) => theme.colors.accent[300]};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    }
  }
`;

export const Switch = styled.div`
  width: 60px;
  height: 30px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 15px;
  position: relative;
  transition: background 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent[500]};
    outline-offset: 4px;
  }
`;

export const Slider = styled.div<{ $isOn: boolean }>`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOn }) => ($isOn ? 'translateX(30px)' : 'translateX(0)')};
  background: ${({ $isOn, theme }) => ($isOn ? theme.colors.accent[500] : 'white')};
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuditNotes = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  color: ${({ theme }) => theme.colors.text};

  h2 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.accent[500]};
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  ul {
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  code {
    color: ${({ theme }) => theme.colors.accent[500]};
    background: rgba(192, 132, 252, 0.1);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
  }
`;
