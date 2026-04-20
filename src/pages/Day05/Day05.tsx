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
      <S.Day05Grid>
        {/* Section 1: Automated Audits */}
        <S.DemoSection $glass>
          <S.SectionIcon>🧪</S.SectionIcon>
          <h2>Automated A11y Pipeline</h2>
          <p>
            We've integrated <code>jest-axe</code> for unit tests and <code>cypress-axe</code> for dynamic 
            E2E flows, ensuring zero accessibility regressions.
          </p>
          <S.AuditStatus>
            <S.StatusItem>
              <S.StatusDot $color="#10b981" $glow />
              <span><strong>Unit Tests:</strong> jest-axe integrated</span>
            </S.StatusItem>
            <S.StatusItem>
              <S.StatusDot $color="#10b981" $glow />
              <span><strong>E2E Tests:</strong> cypress-axe configured</span>
            </S.StatusItem>
          </S.AuditStatus>
        </S.DemoSection>

        {/* Section 2: Pa11y CI */}
        <S.DemoSection $glass>
          <S.SectionIcon>🤖</S.SectionIcon>
          <h2>Pa11y Headless CI</h2>
          <p>
            Automated command-line audits that run against production-like builds to catch issues 
            that only appear in deep page crawls.
          </p>
          <S.Pa11yReport>
            <S.Pa11yHeader>
              <S.TerminalDot $color="#ff5f56" />
              <S.TerminalDot $color="#ffbd2e" />
              <S.TerminalDot $color="#27c93f" />
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
        <S.DemoSection $glass>
          <S.SectionIcon>📱</S.SectionIcon>
          <h2>Mobile Ergonomics</h2>
          <p>
            All interactive elements now follow the WCAG 2.1 AAA success criterion for a minimum 
            <strong> 44x44px</strong> hit area.
          </p>
          <S.TouchComparison>
            <S.ComparisonItem>
              <label>Default (Small)</label>
              <S.TouchBtnBad aria-hidden="true">
                ×
              </S.TouchBtnBad>
              <span style={{ color: '#ef4444', fontSize: '0.8125rem' }}>Too Small</span>
            </S.ComparisonItem>
            <S.ComparisonItem>
              <label>Hardened (44px+)</label>
              <Button variant="secondary" size="lg" aria-label="Accessible close">
                ×
              </Button>
              <span style={{ color: '#10b981', fontSize: '0.8125rem' }}>Passes Audit</span>
            </S.ComparisonItem>
          </S.TouchComparison>
        </S.DemoSection>

        {/* Section 3: Contrast Polish */}
        <S.DemoSection $glass $fullWidth>
          <S.SectionIcon>🎨</S.SectionIcon>
          <h2>Contrast Polish (4.5:1)</h2>
          <p>
            Refined our color palette to ensure all critical text and icons meet the AA standard for 
            high-contrast readability.
          </p>
          <S.ContrastGrid>
            <S.ContrastCard $variant="bad">
              <span>Low Contrast Text</span>
              <S.ContrastMeta>
                <span>Ratio: 2.1:1</span>
                <span>🔴 Fail</span>
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
              <span>Day 05 Hardened</span>
              <S.ContrastMeta>
                <span>Ratio: 12:1</span>
                <span>💎 Premium</span>
              </S.ContrastMeta>
            </S.ContrastCard>
          </S.ContrastGrid>
        </S.DemoSection>
      </S.Day05Grid>

      <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        <p>Verified with AXE Core Engine and Pa11y CI</p>
      </footer>
    </PageLayout>
  );
};

export default Day05;
