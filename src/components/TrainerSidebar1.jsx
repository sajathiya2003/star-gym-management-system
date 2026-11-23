import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrainerSidebar1.css';

const TrainerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const trainerMenuItems = [
    { id: 'trainerdashboard', icon: '📊', label: 'trainerdashboard', path: '/trainer/trainerdashboard' },
    { id: 'MyClients', icon: '👥', label: 'My Clients', path: '/trainer/MyClients' },
    { id: 'trainerworkouts', icon: '💪', label: 'trainerworkouts', path: '/trainer/trainerworkouts' },
    { id: 'Schedule', icon: '📅', label: 'Schedule', path: '/trainer/Schedule' },
    { id: 'session-tracker', icon: '⏱️', label: 'Session Tracker', path: '/trainer/session-tracker' },
    { id: 'Progress', icon: '📈', label: 'Progress', path: '/trainer/Progress' },
    { id: 'trainerprofile', icon: '👨‍💼', label: 'Trainer Profile', path: '/trainer/trainerprofile' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Check if current path is any trainer route
  const isTrainerRoute = () => {
    return location.pathname.startsWith('/trainer/');
  };

  // Only show sidebar on trainer pages
  if (!isTrainerRoute()) {
    return null;
  }

  return (
    <div className={`trainer-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="trainer-sidebar-header">
        <div className="trainer-logo-container">
          <div className="trainer-logo">⭐🏋️</div>
          {!isCollapsed && (
            <div className="trainer-logo-text">
              <h2>Star Gym</h2>
              <span>Trainer Portal</span>
            </div>
          )}
        </div>
        <button 
          className="trainer-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="trainer-sidebar-nav">
        <ul>
          {trainerMenuItems.map(item => (
            <li key={item.id}>
              <button
                className={`trainer-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                title={item.label}
              >
                <span className="trainer-nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="trainer-nav-label">{item.label}</span>}
                {isActive(item.path) && !isCollapsed && (
                  <span className="active-indicator"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="trainer-sidebar-footer">
        <button className="trainer-logout-btn">
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default TrainerSidebar;