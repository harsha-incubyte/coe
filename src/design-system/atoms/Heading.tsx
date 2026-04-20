import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface StyledHeadingProps {
  $level?: HeadingLevel;
}

const levelStyles = {
  1: css`
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  `,
  2: css`
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  `,
  3: css`
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  `,
  4: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  `,
  5: css`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  `,
  6: css`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  `,
};

export const Heading = styled.h1.attrs<StyledHeadingProps>(({ $level = 1 }) => ({
  as: `h${$level}`,
}))<StyledHeadingProps>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-align: center;
  
  ${({ $level = 1 }) => levelStyles[$level]}
`;

Heading.defaultProps = { theme };
