import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 1024px) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary[400]};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary[300]};
    }
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  code {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 0.9em;
    padding: 0.2rem 0.4rem;
    background-color: ${({ theme }) => theme.colors.codeBackground};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  /* Custom Scrollbar for modern look */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[900]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[700]};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[600]};
  }
`;
