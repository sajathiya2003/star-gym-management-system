import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './CustomerLayout.css';

const CustomerLayout = () => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/workout')) return 'My Workout';
    if (path.includes('/nutrition')) return 'Nutrition Plan';
    if (path.includes('/progress')) return 'Progress';
    if (path.includes('/schedule')) return 'Schedule';
    if (path.includes('/profile')) return 'Profile';
    return 'Dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('customer_data');
    setShowLogoutDropdown(false);
    navigate('/');
  };

  const handleDropdownItemClick = (action) => {
    setShowLogoutDropdown(false);
    if (action === 'profile') navigate('/customer/profile');
    if (action === 'settings') navigate('/customer/settings');
  };

  const toggleLogoutDropdown = (e) => {
    e.stopPropagation();
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogoutDropdown(false);
      }
    };

    if (showLogoutDropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLogoutDropdown]);

  return (
    <div className="customer-layout">
      {/* Sidebar */}
      <div className="customer-sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">💪</div>
            <h1 className="logo-text">STAR GYM</h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
            { path: '/workout', icon: '💪', label: 'My Workout', badge: '3' },
            { path: '/nutrition', icon: '🥗', label: 'Nutrition Plan' },
            { path: '/progress', icon: '📊', label: 'Progress', badgeNew: 'New' },
            { path: '/schedule', icon: '📅', label: 'Schedule' },
            { path: '/profile', icon: '👤', label: 'Profile' }
          ].map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
              onClick={() => navigate(`/customer${item.path}`)}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
              {item.badgeNew && <span className="nav-badge new">{item.badgeNew}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <img 
                src="/api/placeholder/40/40" 
                alt="Customer" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'grid';
                }}
              />
              <div className="avatar-fallback">JD</div>
            </div>
            <div className="user-info">
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="customer-main-content">
        <header className="layout-header">
          <div className="header-left">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-subtitle">
              {getPageTitle() === 'Dashboard' 
                ? 'Welcome back, John! Here is your overview for today.'
                : `Manage your ${getPageTitle().toLowerCase()} here`}
            </p>
          </div>

          <div className="header-actions">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <span className="search-icon">🔍</span>
            </div>

            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>

            <div className="user-menu-container" ref={dropdownRef}>
              <div className="user-menu" onClick={toggleLogoutDropdown}>
                <div className="user-avatar">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Customer" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'grid';
                    }}
                  />
                  <div className="avatar-fallback">JD</div>
                </div>
                <div className="user-info">
                 
                </div>
                <span className={`dropdown-arrow ${showLogoutDropdown ? 'rotated' : ''}`}>▼</span>
              </div>

              {showLogoutDropdown && (
                <div className="">
                 
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item logout-item" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
