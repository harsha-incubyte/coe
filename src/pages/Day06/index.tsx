import { Dashboard } from './Dashboard/Dashboard';
import { LoginForm } from '@/design-system/organisms';
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

const Day06 = () => {
  return <Dashboard />;
};

export default Day06;

