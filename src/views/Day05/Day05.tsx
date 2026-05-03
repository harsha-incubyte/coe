import React from 'react';
import { Button } from '@/design-system/atoms';
import { PageLayout } from '@/design-system/layout/PageLayout';
import * as S from './Day05.styles';

const Day05: React.FC = () => {
  return (
    <PageLayout
      title="Automation & UI Sanity"
      description="Hardening the application with automated accessibility audits and mobile ergonomics."
    >
      <S.Day05Grid className="day-05-grid">
        {/* Section 1: Automated Audits */}
        <S.DemoSection $glass data-testid="demo-section-pipeline">
          <S.SectionIcon aria-hidden="true">🧪</S.SectionIcon>
          <h2>Automated A11y Pipeline</h2>
          <p>
            We&apos;ve integrated <code>jest-axe</code> for unit tests and <code>cypress-axe</code> for dynamic 
            E2E flows, ensuring zero accessibility regressions.
          </p>
          <S.AuditStatus>
            <S.StatusItem>
              <S.StatusDot $color="#10b981" $glow aria-hidden="true" />
              <span><strong>Unit Tests:</strong> jest-axe integrated</span>
            </S.StatusItem>
            <S.StatusItem>
              <S.StatusDot $color="#10b981" $glow aria-hidden="true" />
              <span><strong>E2E Tests:</strong> cypress-axe configured</span>
            </S.StatusItem>
          </S.AuditStatus>
        </S.DemoSection>

        {/* Section 2: Pa11y CI */}
        <S.DemoSection $glass data-testid="demo-section-pa11y">
          <S.SectionIcon aria-hidden="true">🤖</S.SectionIcon>
          <h2>Pa11y Headless CI</h2>
          <p>
            Welcome to Day 5! Today we&apos;re building a structured data extractor. Automated command-line audits that run against production-like builds to catch issues 
            that only appear in deep page crawls.
          </p>
          <S.Pa11yReport>
            <S.Pa11yHeader>
              <S.TerminalDot $color="#ff5f56" aria-hidden="true" />
              <S.TerminalDot $color="#ffbd2e" aria-hidden="true" />
              <S.TerminalDot $color="#27c93f" aria-hidden="true" />
              <S.TerminalTitle>pa11y-ci report</S.TerminalTitle>
            </S.Pa11yHeader>
            <S.Pa11yBody>
              <S.Pa11yLine $variant="success">✔ http://localhost:4173/day-01 - 0 errors</S.Pa11yLine>
              <S.Pa11yLine $variant="success">✔ http://localhost:4173/day-02 - 0 errors</S.Pa11yLine>
              <S.Pa11yLine $variant="success">✔ http://localhost:4173/day-05 - 0 errors</S.Pa11yLine>
            </S.Pa11yBody>
          </S.Pa11yReport>
        </S.DemoSection>

        {/* Section 3: Touch Targets */}
        <S.DemoSection $glass data-testid="demo-section-mobile">
          <S.SectionIcon aria-hidden="true">📱</S.SectionIcon>
          <h2>Mobile Ergonomics</h2>
          <p>
            Clicking &quot;Analyze&quot; will process the current data. All interactive elements now follow the WCAG 2.1 AAA success criterion for a minimum 
            <strong> 44x44px</strong> hit area.
          </p>
          <S.TouchComparison>
            <S.ComparisonItem>
              <label htmlFor="btn-before">Reference (Before)</label>
              <S.TouchBtnBad id="btn-before" aria-label="Reference small target" />
              <span style={{ color: '#ef4444', fontSize: '0.8125rem' }}>Visual Only</span>
            </S.ComparisonItem>
            <S.ComparisonItem>
              <label htmlFor="btn-after">Hardened (After)</label>
              <Button id="btn-after" variant="secondary" size="lg" aria-label="Accessible close button">
                ×
              </Button>
              <span style={{ color: '#10b981', fontSize: '0.8125rem' }}>Passes Audit</span>
            </S.ComparisonItem>
          </S.TouchComparison>
        </S.DemoSection>

        {/* Section 4: Contrast Polish */}
        <S.DemoSection $glass $fullWidth data-testid="demo-section-contrast">
          <S.SectionIcon aria-hidden="true">🎨</S.SectionIcon>
          <h2>Contrast Polish (4.5:1)</h2>
          <p>
            Refined our color palette to ensure all critical text and icons meet the AA standard for 
            high-contrast readability.
          </p>
          <S.ContrastGrid>
            <S.ContrastCard $variant="bad">
              <span>Muted Contrast Text</span>
              <S.ContrastMeta>
                <span>Ratio: 4.5:1</span>
                <span>🟠 Hardened</span>
              </S.ContrastMeta>
            </S.ContrastCard>
            <S.ContrastCard $variant="good">
              <span>High Contrast Text</span>
              <S.ContrastMeta>
                <span>Ratio: 7.5:1</span>
                <span>🟢 Pass</span>
              </S.ContrastMeta>
            </S.ContrastCard>
            <S.ContrastCard $variant="hardened">
              <span>Enforced A11y Standard</span>
              <S.ContrastMeta>
                <span>Ratio: 12:1</span>
                <span>💎 Premium</span>
              </S.ContrastMeta>
            </S.ContrastCard>
          </S.ContrastGrid>
        </S.DemoSection>
      </S.Day05Grid>

      <S.Footer>
        <p>Verified with AXE Core Engine and Pa11y CI Automation</p>
      </S.Footer>
    </PageLayout>
  );
};

export default Day05;
