import React, { lazy, Suspense } from 'react';
import { Tabs } from '@/components/Tabs';
import { DeviceConfigurationWizard as Wizard } from '@/pages/Day06/components/Wizard/Wizard';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { Spinner } from '@/components/Spinner/Spinner';
import './Dashboard.css';

// KATA 4: Code Splitting
const RealTimeDataChart = lazy(() => import('@/pages/Day06/components/RealTimeDataChart/RealTimeDataChart'));

export const Dashboard: React.FC = () => {
  return (
    <PageLayout
      title="Advanced React Patterns Dashboard"
      description="Compound Components | Split Context | HOCs | Code Splitting"
    >

      {/* KATA 1: Compound Tabs Component */}
      <Tabs defaultValue="device-setup">
        <Tabs.List>
          <Tabs.Tab id="device-setup">Device Setup</Tabs.Tab>
          <Tabs.Tab id="real-time">Real-Time Telemetry</Tabs.Tab>
          <Tabs.Tab id="docs">Documentation</Tabs.Tab>
        </Tabs.List>

        <section className="dashboard-main-content">
          <Tabs.Panel id="device-setup">
            <div className="panel-inner">
              <h3>Configuration Wizard</h3>
              <p>Follow the steps below to pair and configure your edge device.</p>
              {/* KATA 2: Multi-Step Wizard */}
              <Wizard />
            </div>
          </Tabs.Panel>

          <Tabs.Panel id="real-time">
            <div className="panel-inner">
              {/* KATA 4: Suspense Boundary */}
              <Suspense fallback={<Spinner />}>
                <RealTimeDataChart />
              </Suspense>
            </div>
          </Tabs.Panel>

          <Tabs.Panel id="docs">
            <div className="panel-inner">
              <h3>Implementation Details</h3>
              <ul className="docs-list">
                <li><strong>Compound Components:</strong> Used for the Tabs API to avoid "div soup" and props drilling.</li>
                <li><strong>Split Context:</strong> The Wizard uses separate State and Dispatch contexts to optimize re-renders.</li>
                <li><strong>HOC (withAuth):</strong> This entire page is protected by a higher-order component.</li>
                <li><strong>Code Splitting:</strong> The Telemetry chart is lazy-loaded to reduce initial bundle size.</li>
              </ul>
            </div>
          </Tabs.Panel>
        </section>
      </Tabs>
    </PageLayout>
  );
};
