import styled, { keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';

const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg, 
    ${({ theme }) => `${theme.colors.accent[500]}0d`}, 
    ${({ theme }) => `${theme.colors.accent[600]}26`}
  );
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => `${theme.colors.accent[500]}66`};
  backdrop-filter: blur(8px);
  margin: ${({ theme }) => theme.spacing.xl};

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

export const Sequence = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
`;

interface ItemProps {
  $type?: 'fizz' | 'buzz' | 'fizzbuzz';
}

export const Item = styled.span<ItemProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${({ $type, theme }) => {
    switch ($type) {
      case 'fizz':
        return `
          background: ${theme.colors.info}1a;
          color: ${theme.colors.info};
          border-color: ${theme.colors.info}4d;
        `;
      case 'buzz':
        return `
          background: ${theme.colors.warning}1a;
          color: ${theme.colors.warning};
          border-color: ${theme.colors.warning}4d;
        `;
      case 'fizzbuzz':
        return `
          background: ${theme.colors.accent[500]}26;
          color: ${theme.colors.accent[300]};
          border-color: ${theme.colors.accent[500]};
          font-weight: 900;
          text-transform: uppercase;
        `;
      default:
        return '';
    }
  }}
`;

Container.defaultProps = { theme };
Sequence.defaultProps = { theme };
Item.defaultProps = { theme };


