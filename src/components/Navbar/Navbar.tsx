import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo-incubyte.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        </ul>
        <div className="navbar-actions">
          <button 
            className="user-profile-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-controls="user-menu"
            aria-label="User Profile"
          >
            <div className="avatar-placeholder">H</div>
          </button>
          
          {isDropdownOpen && (
            <div id="user-menu" className="user-dropdown">
              <div className="user-info">
                <span className="user-name">Harsha Vardhana</span>
                <span className="user-email">harsha@example.com</span>
              </div>
              <hr />
              <ul className="dropdown-links">
                <li><a href="#profile">Profile</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#logout">Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
