import React from 'react';
import './Customerdashboard.css';

const Customerdashboard = () => {
  const stats = [
    { title: 'Workouts Completed', value: '12', color: 'red' },
    { title: 'Current Streak', value: '5 days', color: 'white' },
    { title: 'Calories Burned', value: '3,456', color: 'red' },
    { title: 'Weight Loss', value: '2.5 kg', color: 'white' }
  ];

  const recentActivities = [
    { activity: 'Completed Chest Workout', time: '2 hours ago' },
    { activity: 'Logged Meal Plan', time: '4 hours ago' },
    { activity: 'Updated Progress Photos', time: '1 day ago' },
    { activity: 'Scheduled PT Session', time: '2 days ago' }
  ];

  return (
    <div className="dashboard-main-content">
      <div className="main-header">
        <h1>Welcome Back, John! 👋</h1>
        <p>Your fitness journey starts here! Track your progress and stay motivated.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <h3>{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn red">Start Workout</button>
          <button className="action-btn white">Log Nutrition</button>
          <button className="action-btn red">View Progress</button>
          <button className="action-btn white">Book Session</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
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
    </div>
  );
};

export default Customerdashboard;