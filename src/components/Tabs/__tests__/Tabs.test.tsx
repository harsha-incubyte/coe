import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tabs } from '@/components/Tabs/Tabs';

describe('Tabs Component (Compound Pattern)', () => {
  it('should render active panel content by default', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Panel 1 Content</Tabs.Panel>
        <Tabs.Panel id="tab2">Panel 2 Content</Tabs.Panel>
      </Tabs>
    );

    expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2 Content')).not.toBeInTheDocument();
  });

  it('should switch panels when a tab is clicked', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Panel 1 Content</Tabs.Panel>
        <Tabs.Panel id="tab2">Panel 2 Content</Tabs.Panel>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));

    expect(screen.getByText('Panel 2 Content')).toBeInTheDocument();
    expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument();
  });

  it('should have correct ARIA attributes', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Panel 1 Content</Tabs.Panel>
      </Tabs>
    );

    const tabList = screen.getByRole('tablist');
    const tab = screen.getByRole('tab', { name: /tab 1/i });
    const panel = screen.getByRole('tabpanel');

    expect(tabList).toBeInTheDocument();
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(panel).toBeInTheDocument();
  });

  it('should navigate tabs using arrow keys', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel id="tab2">Panel 2</Tabs.Panel>
        <Tabs.Panel id="tab3">Panel 3</Tabs.Panel>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    tab1.focus();

    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('tab', { name: /tab 2/i }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: /tab 3/i })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('tab', { name: /tab 3/i }), { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveFocus();
  });
});
