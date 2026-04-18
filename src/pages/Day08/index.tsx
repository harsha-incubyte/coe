import React from 'react';
import styled from 'styled-components';
import { ThemeManager } from '../../design-system/theme/ThemeManager';
import { Heading } from '../../design-system/atoms/Heading';
import { Button } from '../../design-system/atoms/Button';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ColorSwatch = styled.div<{ $colorKey: string; $step: string | number }>`
  height: 100px;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  background-color: ${({ theme, $colorKey, $step }) => (theme.colors as any)[$colorKey][$step]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.base};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutral[900]};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SwatchInfo = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  padding: 4px 8px;
  border-radius: 4px;
`;

const ComponentShowcase = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px dashed ${({ theme }) => theme.colors.neutral[300]};
`;

const Day08: React.FC = () => {
  return (
    <ThemeManager>
      <PageContainer>
        <header>
          <Heading $level={1}>Day 08: Design Systems & Component Architecture</Heading>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
            Establishing a premium foundation with Design Tokens and Atomic Design.
          </p>
        </header>

        <Section>
          <Heading $level={2}>1. Design Tokens</Heading>
          <p>The sub-atomic foundations of our application's visual language.</p>
          
          <Heading $level={3}>Primary Palette</Heading>
          <TokenGrid>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
              <ColorSwatch key={step} $colorKey="primary" $step={step}>
                <SwatchInfo>Primary {step}</SwatchInfo>
              </ColorSwatch>
            ))}
          </TokenGrid>

          <Heading $level={3} style={{ marginTop: '2rem' }}>Accent Palette</Heading>
          <TokenGrid>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
              <ColorSwatch key={step} $colorKey="accent" $step={step}>
                <SwatchInfo>Accent {step}</SwatchInfo>
              </ColorSwatch>
            ))}
          </TokenGrid>
        </Section>

        <Section>
          <Heading $level={2}>2. Atomic Components</Heading>
          <p>Basic building blocks styled strictly with our Design Tokens.</p>
          
          <Heading $level={3}>Buttons</Heading>
          <ComponentShowcase>
            <Button $variant="primary">Primary Action</Button>
            <Button $variant="secondary">Secondary Action</Button>
            <Button $variant="accent">Accent Action</Button>
            <Button $variant="ghost">Ghost Button</Button>
            <Button $variant="danger">Danger Zone</Button>
          </ComponentShowcase>

          <Heading $level={3} style={{ marginTop: '2rem' }}>Button Sizes</Heading>
          <ComponentShowcase>
            <Button $size="sm">Small</Button>
            <Button $size="md">Medium (Default)</Button>
            <Button $size="lg">Large</Button>
          </ComponentShowcase>
        </Section>

        <Section>
          <Heading $level={2}>3. Typography Scale</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Heading $level={1}>Heading Level 1 (36px)</Heading>
            <Heading $level={2}>Heading Level 2 (30px)</Heading>
            <Heading $level={3}>Heading Level 3 (24px)</Heading>
            <Heading $level={4}>Heading Level 4 (20px)</Heading>
            <Heading $level={5}>Heading Level 5 (18px)</Heading>
            <Heading $level={6}>Heading Level 6 (16px)</Heading>
          </div>
        </Section>

        <Section>
          <Heading $level={2}>Coming Soon: Headless Components</Heading>
          <p>Next up: Implementing custom headless logic for Dropdowns and Modals.</p>
        </Section>
      </PageContainer>
    </ThemeManager>
  );
};

export default Day08;
