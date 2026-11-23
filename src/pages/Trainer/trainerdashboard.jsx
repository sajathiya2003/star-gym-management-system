// src/pages/trainer/TrainerDashboard.jsx
import React from 'react';
import './trainerdashboard.css';

const TrainerDashboard = () => {
  const stats = [
    { title: 'Total Clients', value: '24', icon: 'fas fa-users', color: 'stat-red' },
    { title: 'Active Sessions', value: '8', icon: 'fas fa-running', color: 'stat-white' },
    { title: 'Monthly Income', value: '$2,580', icon: 'fas fa-dollar-sign', color: 'stat-red' },
    { title: 'Workout Plans', value: '15', icon: 'fas fa-dumbbell', color: 'stat-white' }
  ];

  const upcomingSessions = [
    { client: 'Sarah Johnson', time: '09:00 AM', type: 'Personal Training' },
    { client: 'Mike Davis', time: '11:30 AM', type: 'Strength Training' },
    { client: 'Emma Wilson', time: '02:00 PM', type: 'Cardio Session' },
    { client: 'Alex Brown', time: '04:30 PM', type: 'Yoga' }
  ];

  const recentActivities = [
    { activity: 'Completed session with John', time: '2 hours ago' },
    { activity: 'Updated workout plan for Sarah', time: '5 hours ago' },
    { activity: 'New client registration - Mike', time: '1 day ago' },
    { activity: 'Progress report generated', time: '2 days ago' }
  ];

  return (
    <div className="trainer-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Trainer Dashboard</h1>
        <div className="date-display">
          <span>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Upcoming Sessions */}
        <div className="content-card sessions-card">
          <div className="card-header">
            <h2>Today's Sessions</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="sessions-list">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="session-item">
                <div className="session-time">
                  <span className="time">{session.time}</span>
                </div>
                <div className="session-details">
                  <h4>{session.client}</h4>
                  <p>{session.type}</p>
                </div>
                <button className="session-action-btn">
                  <i className="fas fa-play"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="content-card activities-card">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p>{activity.activity}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card actions-card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn red-btn">
              <i className="fas fa-user-plus"></i>
              Add Client
            </button>
            <button className="action-btn white-btn">
              <i className="fas fa-calendar-plus"></i>
              Schedule Session
            </button>
            <button className="action-btn red-btn">
              <i className="fas fa-dumbbell"></i>
              Create Workout
            </button>
            <button className="action-btn white-btn">
              <i className="fas fa-chart-line"></i>
              Track Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
