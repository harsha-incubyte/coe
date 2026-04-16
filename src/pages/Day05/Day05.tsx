import React from 'react';
import Button from '@/components/Button/Button';
import './Day05.css';

const Day05: React.FC = () => {
  return (
    <div className="day-05-container">
      <header className="day-05-header">
        <h1>Automation & UI Sanity</h1>
        <p className="subtitle">
          Hardening the application with automated accessibility audits and mobile ergonomics.
        </p>
      </header>

      <div className="day-05-grid">
        {/* Section 1: Automated Audits */}
        <section className="demo-section card-glass">
          <div className="section-icon">🧪</div>
          <h2>Automated A11y Pipeline</h2>
          <p>
            We've integrated <code>jest-axe</code> for unit tests and <code>cypress-axe</code> for dynamic 
            E2E flows, ensuring zero accessibility regressions.
          </p>
          <div className="audit-status">
            <div className="status-item">
              <span className="status-dot green"></span>
              <span><strong>Unit Tests:</strong> jest-axe integrated</span>
            </div>
            <div className="status-item">
              <span className="status-dot green"></span>
              <span><strong>E2E Tests:</strong> cypress-axe configured</span>
            </div>
          </div>
        </section>

        {/* Section 2: Pa11y CI */}
        <section className="demo-section card-glass">
          <div className="section-icon">🤖</div>
          <h2>Pa11y Headless CI</h2>
          <p>
            Automated command-line audits that run against production-like builds to catch issues 
            that only appear in deep page crawls.
          </p>
          <div className="pa11y-report">
            <div className="pa11y-header">
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
              <span className="terminal-title">pa11y-ci report</span>
            </div>
            <div className="pa11y-body">
              <div className="pa11y-line success">✔ http://localhost:4173/day-01 - 0 errors</div>
              <div className="pa11y-line success">✔ http://localhost:4173/day-02 - 0 errors</div>
              <div className="pa11y-line success">✔ http://localhost:4173/day-05 - 0 errors</div>
            </div>
          </div>
        </section>

        {/* Section 3: Touch Targets */}
        <section className="demo-section card-glass">
          <div className="section-icon">📱</div>
          <h2>Mobile Ergonomics</h2>
          <p>
            All interactive elements now follow the WCAG 2.1 AAA success criterion for a minimum 
            <strong> 44x44px</strong> hit area.
          </p>
          <div className="touch-comparison">
            <div className="comparison-item">
              <label>Default (Small)</label>
              <button className="touch-btn-bad" aria-hidden="true">
                ×
              </button>
              <span className="label-err">Too Small</span>
            </div>
            <div className="comparison-item">
              <label>Hardened (44px+)</label>
              <Button variant="secondary" size="lg" aria-label="Accessible close">
                ×
              </Button>
              <span className="label-success">Passes Audit</span>
            </div>
          </div>
        </section>

        {/* Section 3: Contrast Polish */}
        <section className="demo-section card-glass full-width">
          <div className="section-icon">🎨</div>
          <h2>Contrast Polish (4.5:1)</h2>
          <p>
            Refined our color palette to ensure all critical text and icons meet the AA standard for 
            high-contrast readability.
          </p>
          <div className="contrast-grid">
            <div className="contrast-card bad">
              <span className="contrast-text">Low Contrast Text</span>
              <div className="contrast-meta">
                <span>Ratio: 2.1:1</span>
                <span>🔴 Fail</span>
              </div>
            </div>
            <div className="contrast-card good">
              <span className="contrast-text">High Contrast Text</span>
              <div className="contrast-meta">
                <span>Ratio: 7.5:1</span>
                <span>🟢 Pass</span>
              </div>
            </div>
            <div className="contrast-card hardened">
              <span className="contrast-text">Day 05 Hardened</span>
              <div className="contrast-meta">
                <span>Ratio: 12:1</span>
                <span>💎 Premium</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="day-05-footer">
        <p>Verified with AXE Core Engine and Pa11y CI</p>
      </footer>
    </div>
  );
};

export default Day05;
