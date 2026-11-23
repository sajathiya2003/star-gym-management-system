import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TrainerSidebar from './TrainerSidebar';
import './TrainerLayout.css';

const TrainerLayout = () => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/my-clients')) return 'My Clients';
    if (path.includes('/workout-plans')) return 'Workout Plans';
    if (path.includes('/nutrition-plans')) return 'Nutrition Plans';
    if (path.includes('/schedule')) return 'Schedule';
    if (path.includes('/session-tracker')) return 'Session Tracker';
    if (path.includes('/client-progress')) return 'Client Progress';
    if (path.includes('/messages')) return 'Messages';
    if (path.includes('/payments')) return 'Payments';
    if (path.includes('/profile')) return 'Trainer Profile';
    return 'Dashboard';
  };

  // Handle logout function
  const handleLogout = () => {
    // Clear any stored authentication tokens or user data
    localStorage.removeItem('trainer_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('trainer_data');
    
    // Close dropdown
    setShowLogoutDropdown(false);
    
    // Redirect to home page
    navigate('/');
  };

  // Handle dropdown item clicks
  const handleDropdownItemClick = (action) => {
    setShowLogoutDropdown(false);
    
    if (action === 'profile') {
      navigate('/trainer/profile');
    } else if (action === 'settings') {
      navigate('/trainer/settings');
    }
  };

  // Toggle logout dropdown
  const toggleLogoutDropdown = (e) => {
    e.stopPropagation();
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogoutDropdown(false);
      }
    };

    if (showLogoutDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutDropdown]);

  return (
    <div className="trainer-layout">
      <TrainerSidebar />
      
      <main className="trainer-main-content">
        {/* Top Header */}
        <header className="layout-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="page-title">{getPageTitle()}</h1>
              <p className="page-subtitle">
                {getPageTitle() === 'Dashboard' 
                  ? 'Welcome back, Alex! Here is your overview for today.'
                  : `Manage your ${getPageTitle().toLowerCase()} here`
                }
              </p>
            </div>
            
            <div className="header-right">
              <div className="header-actions">
                {/* Search Bar */}
                <div className="search-container">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>

                {/* Notifications */}
                <button className="notification-btn">
                  <span className="notification-icon">🔔</span>
                  <span className="notification-badge">3</span>
                </button>

                {/* User Menu with Logout */}
                <div className="user-menu-container" ref={dropdownRef}>
                  <div className="user-menu" onClick={toggleLogoutDropdown}>
                    <div className="user-avatar">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="Trainer" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="avatar-fallback">AJ</div>
                    </div>
                    <div className="user-info">
                      <span className="user-name">Alex Johnson</span>
                      <span className="user-role">Certified Trainer</span>
                    </div>
                    <span className={`dropdown-arrow ${showLogoutDropdown ? 'rotated' : ''}`}>▼</span>
                  </div>

                  {/* Logout Dropdown */}
                  {showLogoutDropdown && (
                    <div className="logout-dropdown">
                      <div className="dropdown-item" onClick={() => handleDropdownItemClick('profile')}>
                        <span className="dropdown-icon">👤</span>
                        <span>Profile Settings</span>
                      </div>
                      <div className="dropdown-item" onClick={() => handleDropdownItemClick('settings')}>
                        <span className="dropdown-icon">⚙️</span>
                        <span>Account Settings</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-item logout-item" onClick={handleLogout}>
                        <span className="dropdown-icon">🚪</span>
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TrainerLayout;