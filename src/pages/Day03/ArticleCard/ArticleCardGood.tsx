import React from 'react';
import { CardHeader } from '@/design-system/molecules/CardHeader';
import './ArticleCard.css';

interface ArticleCardProps {
  title: string;
  date: string;
  content: string;
}

const ArticleCardGood: React.FC<ArticleCardProps> = ({ title, date, content }) => {
  return (
    <article className="article-card">
      <CardHeader 
        title={title} 
        subtitle={<time className="date" dateTime={date}>{date}</time>}
        titleLevel={2}
      />
      <div className="card-content">
        <p>{content}</p>
      </div>
      <footer className="card-footer">
        <a 
          href="#" 
          className="read-more-btn"
        >
          Read More
        </a>
      </footer>
    </article>
  );
};

export default ArticleCardGood;
