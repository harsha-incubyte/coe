import React from 'react';
import './ArticleCard.css';

interface ArticleCardProps {
  title: string;
  date: string;
  content: string;
}

const ArticleCardGood: React.FC<ArticleCardProps> = ({ title, date, content }) => {
  return (
    <article className="article-card">
      <header className="card-header">
        <h2 className="title-text">{title}</h2>
        <div className="card-meta">
          <time className="date" dateTime={date}>
            {date}
          </time>
        </div>
      </header>
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
