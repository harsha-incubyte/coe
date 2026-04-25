'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heading } from '@/design-system/atoms';
import { theme } from '@/design-system/theme';
import { useLayout } from './useLayout';

export interface PageLayoutProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  mode?: 'default' | 'full';
}

const PageContainer = styled(motion.div)<{ $maxWidth?: string; $isFull?: boolean }>`
  max-width: ${({ $maxWidth, $isFull }) => ($isFull ? 'none' : $maxWidth || '1200px')};
  margin: ${({ $isFull }) => ($isFull ? '0' : '0 auto')};
  padding: ${({ theme, $isFull }) => ($isFull ? '0' : `${theme.spacing?.lg} ${theme.spacing?.md}`)};
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
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

const ContentContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  description, 
  children,
  maxWidth,
  mode = 'default'
}) => {
  const { setFullWidth } = useLayout();
  const isFull = mode === 'full';

  useEffect(() => {
    setFullWidth(isFull);
    // Cleanup to revert to default mode when unmounting
    return () => setFullWidth(false);
  }, [isFull, setFullWidth]);

  return (
    <PageContainer 
      $maxWidth={maxWidth}
      $isFull={isFull}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {!isFull && (
        <HeaderContainer>
          {typeof title === 'string' ? <Heading $level={1}>{title}</Heading> : title}
          {description && (
            <Description>{description}</Description>
          )}
        </HeaderContainer>
      )}
      <ContentContainer
        initial={isFull ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {children}
      </ContentContainer>
    </PageContainer>
  );
};
