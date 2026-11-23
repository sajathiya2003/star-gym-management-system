// src/pages/trainer/trainerprofile.jsx
import React, { useState } from 'react';
import './trainerprofile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'Rolex Murukan',
      lastName: 'Trainer',
      email: 'rolex.murukan@stargym.com',
      phone: '0778602017',
      specialization: 'Strength Training & Conditioning',
      experience: '5 years',
      certification: 'ACE Certified Personal Trainer',
      bio: 'Dedicated fitness professional with 5 years of experience helping clients achieve their fitness goals through personalized training programs and nutritional guidance.',
      joinDate: '2022-03-15'
    },
    professional: {
      hourlyRate: 75,
      maxClients: 15,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      specialties: ['Strength Training', 'Weight Loss', 'Muscle Building', 'Functional Training'],
      languages: ['English', 'Spanish'],
      education: 'BS in Exercise Science, University of Fitness'
    },
    social: {
      instagram: '@johntrainer_fit',
      facebook: 'John Trainer Fitness',
      youtube: 'John Trainer Workouts'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const stats = [
    { label: 'Total Clients', value: '24', icon: 'fas fa-users' },
    { label: 'Sessions Completed', value: '1,256', icon: 'fas fa-dumbbell' },
    { label: 'Client Rating', value: '4.9/5.0', icon: 'fas fa-star' },
    { label: 'Years Experience', value: '5', icon: 'fas fa-award' }
  ];

  const recentAchievements = [
    { title: '1000th Session', date: '2024-03-01', icon: 'fas fa-trophy' },
    { title: 'Top Rated Trainer', date: '2024-02-15', icon: 'fas fa-medal' },
    { title: 'Client Success Story', date: '2024-01-20', icon: 'fas fa-heart' }
  ];

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
    // In real app, save to backend
    console.log('Saving profile data:', profileData);
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In real app, upload to server
      console.log('Uploading image:', file);
      alert('Profile picture updated!');
    }
  };

  return (
    <div className="trainer-profile">
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
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img 
                  src="https://t4.ftcdn.net/jpg/02/03/86/39/360_F_203863980_7HyQrXkDXGRG4pFu5GWAtu0lcwDS037x.jpg" 
                  alt="Profile" 
                  className="avatar-image"
                />
                <div className="avatar-overlay">
                  <label htmlFor="avatar-upload" className="upload-label">
                    <i className="fas fa-camera"></i>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <div className="profile-basic-info">
                <h2>{profileData.personal.firstName} {profileData.personal.lastName}</h2>
                <p className="specialization">{profileData.personal.specialization}</p>
                <p className="certification">{profileData.personal.certification}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <i className={stat.icon}></i>
                  <div className="stat-info">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="profile-bio">
              <h4>About Me</h4>
              <p>{profileData.personal.bio}</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="achievements-card">
            <h3>Recent Achievements</h3>
            <div className="achievements-list">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">
                    <i className={achievement.icon}></i>
                  </div>
                  <div className="achievement-info">
                    <h5>{achievement.title}</h5>
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <i className="fas fa-user"></i>
              Personal Info
            </button>
            <button 
              className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              <i className="fas fa-briefcase"></i>
              Professional
            </button>
            <button 
              className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              <i className="fas fa-share-alt"></i>
              Social Media
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-shield-alt"></i>
              Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'personal' && (
              <div className="tab-panel">
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
                  <div className="form-group full-width">
                    <label>Specialization</label>
                    <input
                      type="text"
                      value={profileData.personal.specialization}
                      onChange={(e) => handleInputChange('personal', 'specialization', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      value={profileData.personal.experience}
                      onChange={(e) => handleInputChange('personal', 'experience', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Certification</label>
                    <input
                      type="text"
                      value={profileData.personal.certification}
                      onChange={(e) => handleInputChange('personal', 'certification', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Bio</label>
                    <textarea
                      value={profileData.personal.bio}
                      onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                      disabled={!isEditing}
                      rows="4"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="tab-panel">
                <h2>Professional Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={profileData.professional.hourlyRate}
                      onChange={(e) => handleInputChange('professional', 'hourlyRate', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Clients</label>
                    <input
                      type="number"
                      value={profileData.professional.maxClients}
                      onChange={(e) => handleInputChange('professional', 'maxClients', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Availability</label>
                    <div className="availability-tags">
                      {profileData.professional.availability.map((day, index) => (
                        <span key={index} className="availability-tag">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Specialties</label>
                    <div className="specialties-tags">
                      {profileData.professional.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Languages</label>
                    <div className="languages-tags">
                      {profileData.professional.languages.map((language, index) => (
                        <span key={index} className="language-tag">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Education</label>
                    <input
                      type="text"
                      value={profileData.professional.education}
                      onChange={(e) => handleInputChange('professional', 'education', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="tab-panel">
                <h2>Social Media</h2>
                <div className="social-form">
                  <div className="form-group">
                    <label>
                      <i className="fab fa-instagram"></i>
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={profileData.social.instagram}
                      onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
                      disabled={!isEditing}
                      placeholder="@username"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fab fa-facebook"></i>
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={profileData.social.facebook}
                      onChange={(e) => handleInputChange('social', 'facebook', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Page name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fab fa-youtube"></i>
                      YouTube
                    </label>
                    <input
                      type="text"
                      value={profileData.social.youtube}
                      onChange={(e) => handleInputChange('social', 'youtube', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Channel name"
                    />
                  </div>
                </div>
                
                <div className="social-preview">
                  <h3>Profile Preview</h3>
                  <div className="preview-card">
                    <div className="preview-header">
                      <img src="/api/placeholder/60/60" alt="Profile" />
                      <div className="preview-info">
                        <h4>{profileData.personal.firstName} {profileData.personal.lastName}</h4>
                        <p>{profileData.personal.specialization}</p>
                      </div>
                    </div>
                    <div className="preview-social">
                      {profileData.social.instagram && (
                        <a href="#" className="social-link">
                          <i className="fab fa-instagram"></i>
                          {profileData.social.instagram}
                        </a>
                      )}
                      {profileData.social.facebook && (
                        <a href="#" className="social-link">
                          <i className="fab fa-facebook"></i>
                          {profileData.social.facebook}
                        </a>
                      )}
                      {profileData.social.youtube && (
                        <a href="#" className="social-link">
                          <i className="fab fa-youtube"></i>
                          {profileData.social.youtube}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-panel">
                <h2>Security Settings</h2>
                <div className="security-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={profileData.security.currentPassword}
                      onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={profileData.security.newPassword}
                      onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={profileData.security.confirmPassword}
                      onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="btn-primary update-password-btn">
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
                      <p>Get notified of new sign-ins from unknown devices</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="feature-item">
                    <div className="feature-info">
                      <h4>Session Timeout</h4>
                      <p>Automatically log out after 30 minutes of inactivity</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;