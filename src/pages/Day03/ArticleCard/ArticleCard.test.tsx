import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ArticleCardBad from './ArticleCardBad';

describe('ArticleCardBad', () => {
  it('should use non-semantic div tags for structural elements', () => {
    const { container } = render(
      <ArticleCardBad 
        title="Bad Article" 
        date="2024-04-14" 
        content="This is bad."
      />
    );
    
    // Outermost should be a div with class article-card
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
    expect(card.className).toContain('article-card');

    // Title should be a div
    const titleDiv = screen.getByText(/Bad Article/i);
    expect(titleDiv.tagName).toBe('DIV');
    expect(titleDiv.className).toContain('title-text');
  });

  it('should use a div with onClick instead of an anchor tag for action', () => {
    render(
      <ArticleCardBad 
        title="Bad Article" 
        date="2024-04-14" 
        content="This is bad."
      />
    );
    
    const readMore = screen.getByText(/Read More/i);
    expect(readMore.tagName).toBe('DIV');
    expect(readMore.className).toContain('read-more-btn');
  });
});
