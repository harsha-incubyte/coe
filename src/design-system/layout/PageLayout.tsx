import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heading } from '@/design-system/atoms/Heading';
import { theme } from '@/design-system/theme';

export interface PageLayoutProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
}

const PageContainer = styled(motion.div)<{ $maxWidth?: string }>`
  max-width: ${({ $maxWidth }) => $maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing?.['3xl'] || '4rem'} ${({ theme }) => theme.spacing?.md || '1rem'};
  width: 100%;
`;
PageContainer.defaultProps = { theme };

const HeaderContainer = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing?.['3xl'] || '4rem'};
`;
HeaderContainer.defaultProps = { theme };

const Description = styled.p`
  color: ${({ theme }) => theme.colors?.text || '#f9fafb'} !important;
  font-size: 1.2rem;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
  opacity: 1;
  max-width: 800px;
  text-align: center;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors?.accent?.[300] || '#c4b5fd'} !important;
    font-weight: 700;
  }

  code {
    background: ${({ theme }) => theme.colors?.surfaceLight || '#1e293b'} !important;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors?.primary?.[300] || '#a5b4fc'} !important;
    border: 1px solid ${({ theme }) => theme.colors?.border || '#334155'} !important;
  }
`;
Description.defaultProps = { theme };

const ContentContainer = styled(motion.div)``;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  description, 
  children,
  maxWidth 
}) => {
  return (
    <PageContainer 
      $maxWidth={maxWidth}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <HeaderContainer>
        {typeof title === 'string' ? <Heading $level={1}>{title}</Heading> : title}
        {description && (
          <Description>{description}</Description>
        )}
      </HeaderContainer>
      <ContentContainer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {children}
      </ContentContainer>
    </PageContainer>
  );
};
