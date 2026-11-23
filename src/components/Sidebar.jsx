// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Admin routes-ல்மட்டும் show ஆகும்
  if (!location.pathname.startsWith('/admin')) {
    return null;
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin/classes', icon: 'fas fa-dumbbell', label: 'Classes' },
    { path: '/admin/payments', icon: 'fas fa-credit-card', label: 'Bookings' },
    { path: '/admin/reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { path: '/admin/profile', icon: 'fas fa-user', label: 'Profile' },
  ];

  const handleLogout = () => {
    // logout logic here
    navigate('/auth/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <h2>{isCollapsed ? 'GA' : 'GYM ADMIN'}</h2>
        <button className="collapse-toggle" onClick={toggleSidebar}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.path} 
              className={location.pathname === item.path ? 'active' : ''}
            >
              <Link to={item.path} title={isCollapsed ? item.label : ''}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn" title={isCollapsed ? 'Logout' : ''}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;