import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Show sidebar ONLY on customer routes
  // Admin routes-ல்மட்டும் show ஆகும்
  if (!location.pathname.startsWith('/customer')) {
    return null;
  }


  const menuItems = [
    { id: 'Customerdashboard', icon: '🏠', label: 'dashboard', path: '/customer/Customerdashboard', badge: null },
    { id: 'Customerworkout', icon: '💪', label: 'workout', path: '/customer/Customerworkout', badge: 3 },
    { id: 'CustomerNutrition', icon: '🥗', label: 'Nutrition', path: '/customer/CustomerNutrition', badge: null },
    { id: 'Customerprogress', icon: '📊', label: 'progress', path: '/customer/Customerprogress', badge: 'New' },
    { id: 'Customerschedule', icon: '📅', label: 'schedule', path: '/customer/Customerschedule', badge: null },
    { id: 'Customerprofile', icon: '👤', label: 'profile', path: '/customer/Customerprofile', badge: null }
  ];

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    // Navigate to the corresponding route
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  // Render content based on current route
  const renderContent = () => {
    switch (location.pathname) {
      case '/Customer/Customerdashboard':
        return (
          <div>
            <h1>Welcome to Star Gym Dashboard</h1>
            <p>Your fitness journey starts here!</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      case '/Customer/Customerworkout':
        return (
          <div>
            <h1>My Workout Plan</h1>
            <p>Track your workouts and exercises</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      case '/Customer/CustomerNutrition':
        return (
          <div>
            <h1>Nutrition Plan</h1>
            <p>Manage your diet and nutrition</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      case '/Customer/Customerprogress':
        return (
          <div>
            <h1>Progress Tracking</h1>
            <p>Monitor your fitness progress</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      case '/Customer/Customerschedule':
        return (
          <div>
            <h1>Schedule</h1>
            <p>Manage your training schedule</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      case '/Customer/Customerprofile':
        return (
          <div>
            <h1>Profile</h1>
            <p>Manage your account settings</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
      default:
        return (
          <div>
            <h1>Welcome to Star Gym Dashboard</h1>
            <p>Your fitness journey starts here!</p>
            <p>Selected menu: {activeMenu}</p>
          </div>
        );
    }
  };

  return (
    <div className="Customer-dashboard">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-icon">💪</div>
          {!isCollapsed && <h2>STAR GYM</h2>}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id, item.path)}
              title={isCollapsed ? item.label : ''}
            >
              <div className="nav-icon">{item.icon}</div>
              {!isCollapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-membership">Premium Member</span>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            {!isCollapsed && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`dashboard-main ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;