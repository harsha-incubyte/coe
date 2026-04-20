import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heading } from '@/design-system/atoms';
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
  padding: ${({ theme }) => theme.spacing?.['3xl']} ${({ theme }) => theme.spacing?.md};
  width: 100%;
`;
PageContainer.defaultProps = { theme };

const HeaderContainer = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing?.['3xl']};
`;
HeaderContainer.defaultProps = { theme };

const Description = styled.p`
  color: ${({ theme }) => theme.colors?.text};
  font-size: ${({ theme }) => theme.typography?.fontSize?.xl};
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing?.sm};
  opacity: 1; /* Keep opacity at 1 for accessibility */
  max-width: 800px;
  text-align: center;
  line-height: ${({ theme }) => theme.typography?.lineHeight?.relaxed};

  strong {
    color: ${({ theme }) => theme.colors?.accent?.[300]};
    font-weight: ${({ theme }) => theme.typography?.fontWeight?.bold};
  }

  code {
    background: ${({ theme }) => theme.colors?.surfaceLight};
    padding: ${({ theme }) => theme.spacing?.xs} ${({ theme }) => theme.spacing?.sm};
    border-radius: ${({ theme }) => theme.borderRadius?.base};
    font-size: ${({ theme }) => theme.typography?.fontSize?.sm};
    color: ${({ theme }) => theme.colors?.primary?.[300]};
    border: 1px solid ${({ theme }) => theme.colors?.border};
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
