import React from 'react';
import './ArticleCard.css';

interface ArticleCardProps {
  title: string;
  date: string;
  content: string;
}

const ArticleCardBad: React.FC<ArticleCardProps> = ({ title, date, content }) => {
  return (
    <div className="article-card">
      <div className="card-header">
        <div className="title-text">{title}</div>
        <div className="card-meta">
          <span className="date">{date}</span>
        </div>
      </div>
      <div className="card-content">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <div 
          className="read-more-btn" 
          onClick={() => window.location.href = '#'}
        >
          Read More
        </div>
      </div>
    </div>
  );
};

export default ArticleCardBad;
