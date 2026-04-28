import { render, screen } from '@/design-system/test-utils';
import { describe, it, expect } from 'vitest';
import ArticleCardBad from './ArticleCardBad';
import ArticleCardGood from './ArticleCardGood';

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

describe('ArticleCardGood', () => {
  it('should use semantic HTML5 tags for structural elements', () => {
    const { container } = render(
      <ArticleCardGood 
        title="Good Article" 
        date="2024-04-14" 
        content="This is good."
      />
    );
    
    // Outermost should be an <article>
    const card = container.querySelector('article');
    expect(card).toBeInTheDocument();

    // Header should exist
    expect(container.querySelector('header')).toBeInTheDocument();

    // Title should be an h2
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent(/Good Article/i);

    // Date should be in a <time> tag
    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('datetime', '2024-04-14');
  });

  it('should use an anchor tag with href for action', () => {
    render(
      <ArticleCardGood 
        title="Good Article" 
        date="2024-04-14" 
        content="This is good."
      />
    );
    
    const readMore = screen.getByRole('link', { name: /read more/i });
    expect(readMore).toBeInTheDocument();
    expect(readMore).toHaveAttribute('href', '#');
  });
});
