import { withAuth } from '@/components/withAuth/withAuth';
import { Dashboard } from './Dashboard/Dashboard';
import { LoginForm } from '../Day02/LoginForm/LoginForm';
import './Dashboard/Dashboard.css';

const Day06Fallback = () => (
  <div className="dashboard-container">
    <header className="dashboard-header">
      <h1>Advanced React Patterns Dashboard</h1>
      <p className="subtitle">Please login to access the configuration wizard and telemetry data.</p>
    </header>
    <main className="dashboard-main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <LoginForm redirectPath="/day-06" />
    </main>
  </div>
);

// Use withAuth with custom fallback to handle auth "in day-06 itself"
const Day06 = withAuth(Dashboard, {
  fallback: Day06Fallback
});

export default Day06;
