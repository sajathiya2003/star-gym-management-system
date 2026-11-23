import React, { useState, useEffect } from 'react';
import './session-tracker.css';

const SessionTracker = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Active Sessions
    setActiveSessions([
      {
        id: 1,
        clientName: 'John Doe',
        type: 'Personal Training',
        startTime: '10:00 AM',
        duration: 60,
        status: 'active',
        progress: 75,
        clientImage: '👤'
      },
      {
        id: 2,
        clientName: 'Sarah Wilson',
        type: 'Yoga Session',
        startTime: '11:30 AM',
        duration: 45,
        status: 'active',
        progress: 50,
        clientImage: '👩'
      }
    ]);

    // Upcoming Sessions
    setUpcomingSessions([
      {
        id: 3,
        clientName: 'Mike Johnson',
        type: 'Strength Training',
        startTime: '02:00 PM',
        duration: 90,
        status: 'upcoming',
        clientImage: '💪'
      },
      {
        id: 4,
        clientName: 'Emily Davis',
        type: 'Cardio Workout',
        startTime: '04:30 PM',
        duration: 60,
        status: 'upcoming',
        clientImage: '🏃‍♀️'
      }
    ]);

    // Completed Sessions
    setCompletedSessions([
      {
        id: 5,
        clientName: 'David Brown',
        type: 'PT Session',
        startTime: '09:00 AM',
        duration: 60,
        status: 'completed',
        calories: 450,
        clientImage: '👨'
      }
    ]);
  }, []);

  const startSession = (sessionId) => {
    console.log(`Starting session ${sessionId}`);
    // Add your session start logic here
  };

  const endSession = (sessionId) => {
    console.log(`Ending session ${sessionId}`);
    // Add your session end logic here
  };

  const viewSessionDetails = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const getSessionStatusColor = (status) => {
    switch (status) {
      case 'active': return '#dc3545';
      case 'upcoming': return '#ffc107';
      case 'completed': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getSessionStatusText = (status) => {
    switch (status) {
      case 'active': return 'Live';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="session-tracker">
      {/* Header */}
      <div className="session-header">
        <div className="header-content">
          <h1 className="session-title">Session Tracker</h1>
          <p className="session-subtitle">Manage and monitor all training sessions</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge active">
            <span className="stat-number">{activeSessions.length}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-badge upcoming">
            <span className="stat-number">{upcomingSessions.length}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-badge completed">
            <span className="stat-number">{completedSessions.length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="live-indicator"></span>
            Active Sessions
          </h2>
          <span className="session-count">{activeSessions.length} sessions</span>
        </div>
        
        <div className="sessions-grid">
          {activeSessions.map(session => (
            <div key={session.id} className="session-card active">
              <div className="session-header-card">
                <div className="client-avatar">
                  {session.clientImage}
                </div>
                <div className="client-info">
                  <h3 className="client-name">{session.clientName}</h3>
                  <p className="session-type">{session.type}</p>
                </div>
                <div 
                  className="session-status"
                  style={{ backgroundColor: getSessionStatusColor(session.status) }}
                >
                  {getSessionStatusText(session.status)}
                </div>
              </div>

              <div className="session-details">
                <div className="detail-item">
                  <span className="detail-label">Start Time</span>
                  <span className="detail-value">{session.startTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{session.duration} mins</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-header">
                  <span>Session Progress</span>
                  <span>{session.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${session.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="session-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => viewSessionDetails(session)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => endSession(session.id)}
                >
                  End Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h2 className="section-title">Upcoming Sessions</h2>
          <span className="session-count">{upcomingSessions.length} sessions</span>
        </div>
        
        <div className="sessions-list">
          {upcomingSessions.map(session => (
            <div key={session.id} className="session-item upcoming">
              <div className="session-time">
                <span className="time">{session.startTime}</span>
                <span className="duration">{session.duration}min</span>
              </div>
              <div className="session-content">
                <div className="client-avatar small">
                  {session.clientImage}
                </div>
                <div className="session-info">
                  <h4 className="client-name">{session.clientName}</h4>
                  <p className="session-type">{session.type}</p>
                </div>
              </div>
              <div className="session-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => startSession(session.id)}
                >
                  Start
                </button>
                <button 
                  className="btn btn-ghost"
                  onClick={() => viewSessionDetails(session)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h2 className="section-title">Completed Sessions</h2>
          <span className="session-count">{completedSessions.length} sessions</span>
        </div>
        
        <div className="sessions-list compact">
          {completedSessions.map(session => (
            <div key={session.id} className="session-item completed">
              <div className="session-time">
                <span className="time">{session.startTime}</span>
              </div>
              <div className="session-content">
                <div className="client-avatar small">
                  {session.clientImage}
                </div>
                <div className="session-info">
                  <h4 className="client-name">{session.clientName}</h4>
                  <p className="session-type">{session.type} • {session.calories} calories</p>
                </div>
              </div>
              <div className="session-badge completed">
                Completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Details Modal */}
      {isModalOpen && selectedSession && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Session Details</h3>
              <button 
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Client:</span>
                <span className="detail-value">{selectedSession.clientName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Session Type:</span>
                <span className="detail-value">{selectedSession.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedSession.startTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{selectedSession.duration} minutes</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span 
                  className="detail-value status"
                  style={{ color: getSessionStatusColor(selectedSession.status) }}
                >
                  {getSessionStatusText(selectedSession.status)}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button className="btn btn-primary">
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTracker;