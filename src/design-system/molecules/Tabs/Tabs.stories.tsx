import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  args: {
    defaultValue: 'tab1',
    children: (
      <>
        <Tabs.List aria-label="Example tabs">
          <Tabs.Tab id="tab1">Overview</Tabs.Tab>
          <Tabs.Tab id="tab2">Projects</Tabs.Tab>
          <Tabs.Tab id="tab3">Activity</Tabs.Tab>
          <Tabs.Tab id="tab4" disabled>Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">
          <div style={{ padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Overview Content</h3>
            <p>This is the overview section content.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab2">
          <div style={{ padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Projects Content</h3>
            <p>List of your recent projects will appear here.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab3">
          <div style={{ padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Activity Content</h3>
            <p>Your recent activity feed.</p>
          </div>
        </Tabs.Panel>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondTabActive: Story = {
  args: {
    defaultValue: 'tab2',
  },
};

export const ManyTabs: Story = {
  args: {
    defaultValue: 't1',
    children: (
      <>
        <Tabs.List aria-label="Many tabs">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Tabs.Tab key={i} id={`t${i}`}>Tab {i}</Tabs.Tab>
          ))}
        </Tabs.List>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Tabs.Panel key={i} id={`t${i}`}>
            <div style={{ padding: '1rem' }}>Content for Tab {i}</div>
          </Tabs.Panel>
        ))}
      </>
    ),
  },
};
