// src/pages/trainer/Schedule.jsx
import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00', '20:00'
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const sessions = [
    { id: 1, day: 'Mon', time: '09:00', client: 'Sarah Johnson', type: 'Personal Training', duration: 60, status: 'confirmed' },
    { id: 2, day: 'Mon', time: '11:00', client: 'Mike Davis', type: 'Strength Training', duration: 45, status: 'confirmed' },
    { id: 3, day: 'Tue', time: '14:00', client: 'Emma Wilson', type: 'Cardio Session', duration: 60, status: 'pending' },
    { id: 4, day: 'Wed', time: '16:00', client: 'Alex Brown', type: 'Yoga', duration: 90, status: 'confirmed' },
    { id: 5, day: 'Thu', time: '10:00', client: 'Lisa Taylor', type: 'Personal Training', duration: 60, status: 'confirmed' },
    { id: 6, day: 'Fri', time: '18:00', client: 'John Smith', type: 'Group Class', duration: 60, status: 'cancelled' }
  ];

  const getSessionsForSlot = (day, time) => {
    return sessions.filter(session => session.day === day && session.time === time);
  };

  const getSessionStatusClass = (status) => {
    const statusClasses = {
      confirmed: 'status-confirmed',
      pending: 'status-pending',
      cancelled: 'status-cancelled'
    };
    return statusClasses[status] || '';
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const todaySessions = sessions.filter(session => session.day === 'Mon'); // Simplified for demo

  return (
    <div className="trainer-schedule">
      {/* Header */}
      <div className="schedule-header">
        <h1 className="schedule-title">Training Schedule</h1>
        <div className="schedule-actions">
          <button className="add-session-btn">
            <i className="fas fa-plus"></i>
            New Session
          </button>
        </div>
      </div>

      {/* Schedule Controls */}
      <div className="schedule-controls">
        <div className="view-toggle">
          <button 
            className={`view-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
        </div>

        <div className="date-navigation">
          <button className="nav-btn" onClick={() => navigateDate(-1)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="current-date">
            {currentDate.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric',
              ...(view === 'week' && { day: 'numeric' })
            })}
          </span>
          <button className="nav-btn" onClick={() => navigateDate(1)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <button className="today-btn" onClick={() => setCurrentDate(new Date())}>
          Today
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="schedule-container">
        {view === 'week' && (
          <div className="week-view">
            {/* Time Column */}
            <div className="time-column">
              <div className="time-header"></div>
              {timeSlots.map(time => (
                <div key={time} className="time-slot">
                  {time}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            {days.map(day => (
              <div key={day} className="day-column">
                <div className="day-header">
                  <span className="day-name">{day}</span>
                  <span className="day-date">15</span>
                </div>
                {timeSlots.map(time => {
                  const slotSessions = getSessionsForSlot(day, time);
                  return (
                    <div 
                      key={`${day}-${time}`} 
                      className="time-cell"
                      onClick={() => setSelectedTimeSlot({ day, time })}
                    >
                      {slotSessions.map(session => (
                        <div 
                          key={session.id} 
                          className={`session-block ${getSessionStatusClass(session.status)}`}
                          style={{ height: `${(session.duration / 60) * 100}%` }}
                        >
                          <div className="session-info">
                            <strong>{session.client}</strong>
                            <span>{session.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Today's Sessions Sidebar */}
        <div className="today-sessions">
          <h3>Today's Sessions</h3>
          <div className="sessions-list">
            {todaySessions.map(session => (
              <div key={session.id} className="session-card">
                <div className="session-time">
                  <span>{session.time}</span>
                </div>
                <div className="session-details">
                  <h4>{session.client}</h4>
                  <p>{session.type}</p>
                  <span className={`session-status ${getSessionStatusClass(session.status)}`}>
                    {session.status}
                  </span>
                </div>
                <div className="session-actions">
                  <button className="action-btn start-btn">
                    <i className="fas fa-play"></i>
                  </button>
                  <button className="action-btn reschedule-btn">
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="schedule-stats">
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Sessions Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6h</div>
              <div className="stat-label">Total Hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">85%</div>
              <div className="stat-label">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Time Slot Modal */}
      {selectedTimeSlot && (
        <div className="modal-overlay">
          <div className="time-slot-modal">
            <div className="modal-header">
              <h3>Schedule Session</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedTimeSlot(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <p>Selected: {selectedTimeSlot.day} at {selectedTimeSlot.time}</p>
              {/* Add session form would go here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;