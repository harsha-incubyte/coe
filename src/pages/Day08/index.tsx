import React from 'react';
import styled from 'styled-components';
import { Heading } from '@/design-system/atoms/Heading';
import { Button } from '@/design-system/atoms/Button';
import { Input } from '@/design-system/atoms/Input';
import { Checkbox } from '@/design-system/atoms/Checkbox';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useModal } from '@/hooks/useModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { Dropdown } from '@/design-system/molecules/Dropdown';
import { Alert } from '@/design-system/molecules/Alert';
import { Badge } from '@/design-system/molecules/Badge';
import { StepIndicator } from '@/design-system/molecules/StepIndicator';
import { Pagination } from '@/design-system/molecules/Pagination';
import { Breadcrumbs } from '@/design-system/molecules/Breadcrumbs';
import { SearchBar } from '@/design-system/molecules/SearchBar';
import { StatBlock } from '@/design-system/molecules/StatBlock';
import { CheckboxGroup } from '@/design-system/molecules/CheckboxGroup';
import { RadioGroup } from '@/design-system/molecules/RadioGroup';
import { InputGroup } from '@/design-system/molecules/InputGroup';
import { Tabs } from '@/design-system/molecules/Tabs/Tabs';
import { useToast } from '@/hooks/useToast';
import { Modal } from '@/design-system/molecules/Modal';

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
      <Button variant="accent" size="sm" onClick={onToggle}>
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

const ModalDemo = () => {
  const { isOpen, onOpen, onClose } = useModal();
  return (
    <>
      <Button variant="primary" size="sm" onClick={onOpen}>
        Open Modal Showcase
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} title="Design System Modal">
        <p>This modal is managed by the new <code>useModal</code> hook, which automatically handles body scroll locking.</p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose}>Close Modal</Button>
        </div>
      </Modal>
    </>
  );
};

const DropdownDemo = () => {
  return (
    <Dropdown 
      label="Account Settings" 
      items={[
        { label: 'Profile', onClick: () => alert('Profile clicked') },
        { label: 'Security', onClick: () => alert('Security clicked') },
        { label: 'Logout', onClick: () => alert('Logout clicked') },
      ]} 
    />
  );
};

const MoleculesShowcase = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [frameworks, setFrameworks] = React.useState(['react']);
  const [color, setColor] = React.useState('blue');
  const { showToast } = useToast();

  return (
    <>
      <Heading $level={3}>Feedback & Status</Heading>
      <ComponentShowcase style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Alert variant="success" title="Success!" message="Your profile has been updated." />
        <Alert variant="info" message="A new version of the dashboard is available." />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Badge variant="primary" label="New Feature" />
          <Badge variant="success" label="Active" />
          <Badge variant="warning" label="Pending" />
          <Badge variant="error" label="Closed" pill />
          <Badge variant="info" label="v2.4.0" size="sm" />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary" size="sm" onClick={() => showToast('Toast triggered from showcase!', 'success')}>
            Test Success Toast
          </Button>
          <Button variant="secondary" size="sm" onClick={() => showToast('Something went wrong.', 'error')}>
            Test Error Toast
          </Button>
        </div>
      </ComponentShowcase>

      <Heading $level={3} style={{ marginTop: '2rem' }}>Navigation</Heading>
      <ComponentShowcase style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Library', href: '#' }, { label: 'Showcase' }]} />
        <StepIndicator activeIndex={2} steps={[{ label: 'Discovery' }, { label: 'Design' }, { label: 'Development' }, { label: 'Deployment' }]} />
        <Tabs defaultValue="concept">
          <Tabs.List>
            <Tabs.Tab id="concept">Concept</Tabs.Tab>
            <Tabs.Tab id="execution">Execution</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="concept">
            Molecules are groups of atoms bonded together to take on new properties.
          </Tabs.Panel>
          <Tabs.Panel id="execution">
            We use styled-components and design tokens to ensure visual consistency.
          </Tabs.Panel>
        </Tabs>
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
      </ComponentShowcase>

      <Heading $level={3} style={{ marginTop: '2rem' }}>Forms & Search</Heading>
      <FormShowcase>
        <SearchBar placeholder="Search molecules..." onSearch={(v) => console.log(v)} />
        <InputGroup prefix="$" suffix=".00">
          <Input label="Amount" hideLabel placeholder="Enter amount" />
        </InputGroup>
        <CheckboxGroup 
          label="Preferred Frameworks" 
          options={[{label: 'React', value: 'react'}, {label: 'Vue', value: 'vue'}, {label: 'Angular', value: 'angular'}]}
          value={frameworks}
          onChange={setFrameworks}
          variant="horizontal"
        />
        <RadioGroup 
          label="Display Color" 
          options={[{label: 'Red', value: 'red'}, {label: 'Blue', value: 'blue'}, {label: 'Green', value: 'green'}]}
          value={color}
          onChange={setColor}
          variant="horizontal"
        />
      </FormShowcase>

      <Heading $level={3} style={{ marginTop: '2rem' }}>Content Composition</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <StatBlock label="Monthly Revenue" value="$42,500" trend={{ value: '+12.5%', type: 'success' }} />
        <StatBlock label="Active Users" value="1,240" trend={{ value: '+5%', type: 'success' }} />
        <StatBlock label="System Health" value="99.9%" trend={{ value: 'Stable', type: 'info' }} />
      </div>
    </>
  );
};

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
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
  color: ${({ theme, $step }) => (Number($step) > 400 ? 'white' : theme.colors.neutral[950])}; // TODO: Remove this redundant style
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
    <PageLayout
      title="Day 08: Design Systems & Component Architecture"
      description="Establishing a premium foundation with Design Tokens and Atomic Design."
    >
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
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="accent">Accent Action</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Zone</Button>
        </ComponentShowcase>

        <Heading $level={3} style={{ marginTop: '2rem' }}>Button Sizes</Heading>
        <ComponentShowcase>
          <Button size="sm">Small</Button>
          <Button size="md">Medium (Default)</Button>
          <Button size="lg">Large</Button>
        </ComponentShowcase>

        <Heading $level={3} style={{ marginTop: '2rem' }}>Button States</Heading>
        <ComponentShowcase>
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button isLoading>Loading State</Button>
          <Button variant="accent" isLoading>Loading Accent</Button>
          <Button variant="danger" isLoading>Loading Danger</Button>
        </ComponentShowcase>
        
        <Heading $level={3} style={{ marginTop: '2rem' }}>Buttons with Icons</Heading>
        <ComponentShowcase>
          <Button 
            leftIcon={
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          >
            Search
          </Button>
          <Button 
            variant="secondary"
            rightIcon={
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          >
            Get Started
          </Button>
        </ComponentShowcase>

        <Heading $level={3} style={{ marginTop: '2rem' }}>Full Width Button</Heading>
        <ComponentShowcase style={{ alignItems: 'stretch' }}>
          <Button fullWidth>Expand All Options</Button>
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
        <Heading $level={2}>3. Molecule Components</Heading>
        <p>Combinations of atoms that form modular, functional components.</p>
        <MoleculesShowcase />
      </Section>

      <Section>
        <Heading $level={2}>4. Typography Scale</Heading>
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
        <Heading $level={2}>5. Custom Hooks</Heading>
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

          <HookCard>
            <Heading $level={3}>useModal</Heading>
            <p>Extends disclosure with scroll locking and modal-specific behavior.</p>
            <ModalDemo />
          </HookCard>

          <HookCard>
            <Heading $level={3}>useDropdown</Heading>
            <p>Manages overlay visibility, click-outside behavior, and Esc-key dismissal.</p>
            <DropdownDemo />
          </HookCard>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Day08;
