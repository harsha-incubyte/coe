import { withAuth } from '@/components/withAuth/withAuth';
import { Dashboard } from './Dashboard/Dashboard';
import { LoginForm } from '@/pages/Day02/LoginForm/LoginForm';
import { PageLayout } from '@/design-system/layout/PageLayout';
import './Dashboard/Dashboard.css';

const Day06Fallback = () => (
  <PageLayout 
    title="Advanced React Patterns Dashboard"
    description="Please login to access the configuration wizard and telemetry data."
  >
    <main className="dashboard-main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <LoginForm redirectPath="/day-06" />
    </main>
  </PageLayout>
);

// Use withAuth with custom fallback to handle auth "in day-06 itself"
const Day06 = withAuth(Dashboard, {
  fallback: Day06Fallback
});

export default Day06;

