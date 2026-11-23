// src/pages/admin/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'Sakithiya',
      lastName: 'Jeyakanthan',
      email: 'Sakithiyajeyakanthan6@gmail.com',
      phone: '0741216778',
      position: 'Head Administrator',
      joinDate: '2023-01-15'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    preferences: {
      language: 'english',
      theme: 'light',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  });

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  return (
    <div className="profile-admin">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <img 
                src="C:\Users\sakit\OneDrive\Pictures\images.png"
                alt="Profile" 
                className="avatar-image"
              />
              <div className="avatar-overlay">
                <i className="fas fa-camera"></i>
              </div>
            </div>
            <h2 className="profile-name">
              {profileData.personal.firstName} {profileData.personal.lastName}
            </h2>
            <p className="profile-role">{profileData.personal.position}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">2.5K</span>
                <span className="stat-label">Members</span>
              </div>
              <div className="stat">
                <span className="stat-value">156</span>
                <span className="stat-label">Classes</span>
              </div>
              <div className="stat">
                <span className="stat-value">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          <nav className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <i className="fas fa-user"></i>
              Personal Info
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-shield-alt"></i>
              Security
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <i className="fas fa-cog"></i>
              Preferences
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {activeTab === 'personal' && (
            <div className="tab-content">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={profileData.personal.firstName}
                    onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={profileData.personal.lastName}
                    onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileData.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.personal.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    value={profileData.personal.position}
                    onChange={(e) => handleInputChange('personal', 'position', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Join Date</label>
                  <input
                    type="date"
                    value={profileData.personal.joinDate}
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Security Settings</h2>
              <div className="security-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={profileData.security.currentPassword}
                    onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={profileData.security.newPassword}
                    onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={profileData.security.confirmPassword}
                    onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                  />
                </div>
                <button className="btn-primary">
                  Update Password
                </button>
              </div>

              <div className="security-features">
                <h3>Security Features</h3>
                <div className="feature-item">
                  <div className="feature-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <div className="feature-info">
                    <h4>Login Notifications</h4>
                    <p>Get notified of new sign-ins</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Preferences</h2>
              
              <div className="preferences-section">
                <h3>Appearance</h3>
                <div className="preference-grid">
                  <div className="form-group">
                    <label>Language</label>
                    <select value={profileData.preferences.language}>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Theme</label>
                    <select value={profileData.preferences.theme}>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="preferences-section">
                <h3>Notifications</h3>
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates via email</p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={profileData.preferences.notifications.email}
                        onChange={(e) => handleInputChange('preferences', 'notifications', {
                          ...profileData.preferences.notifications,
                          email: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>SMS Notifications</h4>
                      <p>Receive text message alerts</p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={profileData.preferences.notifications.sms}
                        onChange={(e) => handleInputChange('preferences', 'notifications', {
                          ...profileData.preferences.notifications,
                          sms: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Push Notifications</h4>
                      <p>Receive browser notifications</p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={profileData.preferences.notifications.push}
                        onChange={(e) => handleInputChange('preferences', 'notifications', {
                          ...profileData.preferences.notifications,
                          push: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;