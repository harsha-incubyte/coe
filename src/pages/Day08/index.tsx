import React from 'react';
import styled from 'styled-components';
import { ThemeManager } from '@/design-system/theme/ThemeManager';
import { Heading } from '@/design-system/atoms/Heading';
import { Button } from '@/design-system/atoms/Button';
import { Input } from '@/design-system/atoms/Input';
import { Checkbox } from '@/design-system/atoms/Checkbox';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HookCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DisclosureDemo = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div>
      <Button $variant="accent" $size="sm" onClick={onToggle}>
        {isOpen ? 'Close' : 'Show'} Secret Message
      </Button>
      {isOpen && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          This message is managed by useDisclosure!
        </div>
      )}
    </div>
  );
};

const MediaQueryDemo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div style={{ 
      padding: '0.5rem 1rem', 
      borderRadius: '20px', 
      display: 'inline-block',
      background: isMobile ? '#f43f5e' : '#10b981',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 'bold'
    }}>
      {isMobile ? 'Mobile View: ON' : 'Desktop View: ON'}
    </div>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

type ColorPaletteKey = 'primary' | 'accent' | 'neutral';
type ColorStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

const ColorSwatch = styled.div<{ $colorKey: ColorPaletteKey; $step: ColorStep }>`
  height: 100px;
  background-color: ${({ theme, $colorKey, $step }) => theme.colors[$colorKey][$step]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.base};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme, $step }) => (Number($step) > 400 ? 'white' : theme.colors.neutral[950])};
  background-clip: padding-box;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SwatchInfo = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  padding: 4px 8px;
  border-radius: 6px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ComponentShowcase = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormShowcase = styled(ComponentShowcase)`
  flex-direction: column;
  align-items: stretch;
  max-width: 500px;
`;

const Day08: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <ThemeManager>
      <PageContainer>
        <header>
          <Heading $level={1}>Day 08: Design Systems & Component Architecture</Heading>
          <Description>
            Establishing a premium foundation with Design Tokens and Atomic Design.
          </Description>
        </header>

        <Section>
          <Heading $level={2}>1. Design Tokens</Heading>
          <p>The sub-atomic foundations of our application's visual language.</p>
          
          <Heading $level={3}>Primary Palette</Heading>
          <TokenGrid>
            {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const).map((step) => (
              <ColorSwatch key={step} $colorKey="primary" $step={step}>
                <SwatchInfo>Primary {step}</SwatchInfo>
              </ColorSwatch>
            ))}
          </TokenGrid>

          <Heading $level={3} style={{ marginTop: '2rem' }}>Accent Palette</Heading>
          <TokenGrid>
            {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const).map((step) => (
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

          <Heading $level={3} style={{ marginTop: '2rem' }}>Form Elements</Heading>
          <FormShowcase>
            <Input 
              label="Standard Input" 
              placeholder="e.g. John Doe" 
              helperText="Built with full A11y support"
            />
            <Input 
              label="Error State" 
              defaultValue="Invalid Value"
              error="This field is required"
            />
            <Checkbox 
              label="Accept Terms & Conditions" 
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </FormShowcase>
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
          <Heading $level={2}>4. Custom Hooks</Heading>
          <p>Foundational hooks to power our design system and manage complex UI states.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <HookCard>
              <Heading $level={3}>useBoolean / useDisclosure</Heading>
              <p>Standardized toggle and open/close logic with semantic callbacks.</p>
              <DisclosureDemo />
            </HookCard>
            
            <HookCard>
              <Heading $level={3}>useMediaQuery</Heading>
              <p>Type-safe responsive logic that tracks viewport changes.</p>
              <MediaQueryDemo />
            </HookCard>
          </div>
        </Section>
      </PageContainer>
    </ThemeManager>
  );
};

export default Day08;
