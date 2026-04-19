import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { useToast } from '@/hooks/useToast';
import logo from '@/assets/logo-incubyte.png';
import { queryClient } from '@/lib/queryClient';
import { fetchTasks, tasksQueryKey } from '@/hooks/queries/useTasks';
import { Dropdown } from '@/design-system/molecules/Dropdown';
import styled from 'styled-components';
import './Navbar.css';

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAppStore();
  const { showToast } = useToast();

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    logout();
    showToast('You have been logged out successfully.', 'info');
    navigate('/day-02/login');
  };

  const prefetchTasks = () => {
    queryClient.prefetchQuery({
      queryKey: tasksQueryKey,
      queryFn: fetchTasks,
    });
  };

  return (
    <header className="navbar-header">
      <nav className="navbar" aria-label="Main Navigation">
        <div className="navbar-logo">
          <img src={logo} alt="Incubyte Logo" className="logo-image" />
          <span className="logo-text">COE</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/day-01" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 01
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-02" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 02
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-03" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 03
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-04" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 04
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-05" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 05
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-06" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 06
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-07" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onMouseEnter={prefetchTasks}
            >
              Day 07
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/day-08" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Day 08
            </NavLink>
          </li>
        </ul>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <Dropdown
              trigger={({ isOpen, onToggle }) => (
                <button 
                  className="user-profile-btn"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                  aria-label="User Profile"
                >
                  <div className="avatar-placeholder">
                    {user?.name.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              )}
              items={[
                { label: 'Profile', onClick: () => navigate('#profile') },
                { label: 'Settings', onClick: () => navigate('#settings') },
                { label: 'Logout', onClick: (e?: any) => handleLogout(e), variant: 'danger' },
              ]}
            >
              <UserInfo>
                <UserName>{user?.name}</UserName>
                <UserEmail>{user?.email}</UserEmail>
              </UserInfo>
            </Dropdown>
          ) : (
            <NavLink to="/day-02/login" className="login-nav-btn">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
