import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { useToast } from '@/hooks/useToast';
import logo from '@/assets/logo-incubyte.png';
import { queryClient } from '@/lib/queryClient';
import { fetchTasks, tasksQueryKey } from '@/hooks/queries/useTasks';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isOpen: isDropdownOpen, onToggle: toggleDropdown, onClose: closeDropdown } = useDisclosure();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, closeDropdown);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAppStore();
  const { showToast } = useToast();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    closeDropdown();
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
            <div className="user-profile-wrapper" ref={dropdownRef}>
              <button 
                className="user-profile-btn"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-controls="user-menu"
                aria-label="User Profile"
              >
                <div className="avatar-placeholder">
                  {user?.name.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              
              {isDropdownOpen && (
                <div id="user-menu" className="user-dropdown">
                  <div className="user-info">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-email">{user?.email}</span>
                  </div>
                  <hr />
                  <ul className="dropdown-links">
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#settings">Settings</a></li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="dropdown-logout-btn"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/day-02/login" className="login-nav-btn">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
