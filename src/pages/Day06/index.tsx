import { withAuth } from '@/components/withAuth/withAuth';
import { Dashboard } from './Dashboard/Dashboard';
import { LoginForm } from '@/pages/Day02/LoginForm/LoginForm';
import { PageLayout } from '@/design-system/layout/PageLayout';
import * as S from './Dashboard/Dashboard.styles';

const Day06Fallback = () => (
  <PageLayout 
    title="Advanced React Patterns Dashboard"
    description="Please login to access the configuration wizard and telemetry data."
  >
    <S.DashboardMainContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm redirectPath="/day-06" />
    </S.DashboardMainContent>
  </PageLayout>
);

// Use withAuth with custom fallback to handle auth "in day-06 itself"
const Day06 = withAuth(Dashboard, {
  fallback: Day06Fallback
});

export default Day06;

