import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo-incubyte.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
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
      </ul>
      <div className="navbar-actions"></div>
    </nav>
  );
};

export default Navbar;
