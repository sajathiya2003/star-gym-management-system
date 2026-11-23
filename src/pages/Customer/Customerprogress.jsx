import React from 'react';
import './Customerprogress.css';

const Customerprogress = () => {
  const progressStats = [
    { metric: 'Weight', current: '75kg', target: '72kg', change: '-2.5kg', trend: 'down' },
    { metric: 'Body Fat', current: '18%', target: '15%', change: '-2%', trend: 'down' },
    { metric: 'Muscle Mass', current: '35kg', target: '37kg', change: '+1.2kg', trend: 'up' },
    { metric: 'BMI', current: '24.2', target: '23.0', change: '-0.8', trend: 'down' }
  ];

  const weeklyProgress = [
    { week: 'Week 1', weight: '77.5kg', bodyFat: '20%', workouts: 3 },
    { week: 'Week 2', weight: '76.8kg', bodyFat: '19%', workouts: 4 },
    { week: 'Week 3', weight: '76.0kg', bodyFat: '18.5%', workouts: 5 },
    { week: 'Week 4', weight: '75.0kg', bodyFat: '18%', workouts: 5 }
  ];

  return (
    <div className="progress-tracking-content">
      <div className="main-header">
        <h1>Progress Tracking 📊</h1>
        <p>Monitor your fitness journey and celebrate your achievements</p>
      </div>

      {/* Progress Overview */}
      <div className="progress-section">
        <h2>Current Progress</h2>
        <div className="progress-stats-grid">
          {progressStats.map((stat, index) => (
            <div key={index} className="progress-stat-card">
              <div className="stat-main">
                <h3>{stat.metric}</h3>
                <div className="current-value">{stat.current}</div>
                <div className={`change ${stat.trend}`}>
                  {stat.change}
                </div>
              </div>
              <div className="stat-target">
                Target: <strong>{stat.target}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="progress-section">
        <h2>Weight Progress</h2>
        <div className="progress-chart">
          <div className="chart-container">
            <div className="chart-bars">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-label">{week.week}</div>
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar"
                      style={{ height: `${(78 - week.weight.replace('kg', '')) * 10}px` }}
                    ></div>
                  </div>
                  <div className="chart-bar-value">{week.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress History */}
      <div className="progress-section">
        <h2>Weekly Progress History</h2>
        <div className="progress-table">
          <div className="table-header">
            <span>Week</span>
            <span>Weight</span>
            <span>Body Fat</span>
            <span>Workouts</span>
            <span>Status</span>
          </div>
          <div className="table-body">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="table-row">
                <span>{week.week}</span>
                <span>{week.weight}</span>
                <span>{week.bodyFat}</span>
                <span>{week.workouts}/5</span>
                <span className={`status ${index === weeklyProgress.length - 1 ? 'current' : 'completed'}`}>
                  {index === weeklyProgress.length - 1 ? 'Current' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="progress-section">
        <h2>Recent Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card red">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-info">
              <h3>5 Workout Streak</h3>
              <p>Completed 5 workouts in a row</p>
            </div>
          </div>
          <div className="achievement-card white">
            <div className="achievement-icon">⚡</div>
            <div className="achievement-info">
              <h3>Weight Loss</h3>
              <p>Lost 2.5kg this month</p>
            </div>
          </div>
          <div className="achievement-card red">
            <div className="achievement-icon">💪</div>
            <div className="achievement-info">
              <h3>Strength Gain</h3>
              <p>Increased bench press by 10kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerprogress;