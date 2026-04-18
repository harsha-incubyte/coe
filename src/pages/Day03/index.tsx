import React, { useState } from 'react';
import ArticleCardBad from './ArticleCard/ArticleCardBad';
import ArticleCardGood from './ArticleCard/ArticleCardGood';
import { PageLayout } from '@/design-system/layout/PageLayout';
import './Day03.css';

const Day03: React.FC = () => {
  const [useSemantic, setUseSemantic] = useState(true);

  const articles = [
    {
      title: "The Power of Semantic HTML",
      date: "2024-04-14",
      content: "Semantic HTML is not just about choosing the right tags; it's about providing meaning and context to both users and machines.",
    },
    {
      title: "ARIA: Bridging the Gap",
      date: "2024-04-15",
      content: "When semantic HTML isn't enough, ARIA attributes help convey states and relationships to assistive technologies.",
    },
    {
      title: "Focus Management",
      date: "2024-04-16",
      content: "Proper focus management, including skip links and trapping focus in modals, is essential for keyboard users.",
    }
  ];

  return (
    <PageLayout
      title="Semantic Audit & Accessibility"
      description={
        <span>
          Toggle between <strong>Semantic HTML</strong> and <strong>Div Soup</strong> to see how 
          the underlying structure changes while maintaining a similar visual identity.
          Use <code>Tab</code> to navigate and see the accessibility differences.
        </span>
      }
    >
      <div className="toggle-container" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <label className="switch-label">
          <span className={!useSemantic ? 'active' : ''}>Non-Semantic</span>
          <div 
            className="switch" 
            onClick={() => setUseSemantic(!useSemantic)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setUseSemantic(!useSemantic); }}
            aria-label="Toggle Semantic HTML"
          >
            <div className={`slider ${useSemantic ? 'on' : ''}`}></div>
          </div>
          <span className={useSemantic ? 'active' : ''}>Semantic</span>
        </label>
      </div>

      <div className="comparison-grid">
        {articles.map((article, index) => (
          <div key={index} className="card-wrapper">
            {useSemantic ? (
              <ArticleCardGood {...article} />
            ) : (
              <ArticleCardBad {...article} />
            )}
          </div>
        ))}
      </div>

      <section className="audit-notes" style={{ marginTop: '2rem' }}>
        <h2>Semantic Audit Notes</h2>
        <ul>
          <li><strong>Article Container:</strong> Using <code>&lt;article&gt;</code> instead of <code>&lt;div&gt;</code> marks the content as independently distributable.</li>
          <li><strong>Heading Hierarchy:</strong> Proper <code>&lt;h3&gt;</code> usage ensures a logical document outline for screen readers.</li>
          <li><strong>Machine-Readable Dates:</strong> The <code>&lt;time&gt;</code> element with <code>dateTime</code> attribute allows robots to parse dates accurately.</li>
          <li><strong>Interactive Elements:</strong> Using <code>&lt;a&gt;</code> for navigation links provides free keyboard support (Enter key) and correct role announcement.</li>
        </ul>
      </section>
    </PageLayout>
  );
};

export default Day03;
