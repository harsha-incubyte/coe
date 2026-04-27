import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  font-size: 14px;
  line-height: 1.6;

  p { margin-top: 0; margin-bottom: 0.5rem; }
  p:last-child { margin-bottom: 0; }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  ul, ol {
    margin-top: 0;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  th, td {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
  }
  
  th {
    background: rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  code {
    background: rgba(0,0,0,0.2);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background: rgba(0,0,0,0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    
    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid #f59e0b;
    margin: 0 0 1rem 0;
    padding: 0.5rem 1rem;
    background: rgba(245, 158, 11, 0.1);
    border-radius: 0 4px 4px 0;
    
    p { margin: 0; color: #fbbf24; }
  }
`;

export const AIResponseRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Sanitize content to remove leaking stop tokens like <end_of_turn>
  const sanitizedContent = content.replace(/<end_of_turn>/g, '');

  return (
    <MarkdownContainer>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {sanitizedContent}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};
