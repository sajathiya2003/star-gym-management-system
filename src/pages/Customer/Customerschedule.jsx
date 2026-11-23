import React from 'react';
import './Customerschedule.css';

const Schedule = () => {
  const weeklySchedule = [
    { 
      day: 'Monday', 
      sessions: [
        { time: '7:00 AM', type: 'Personal Training', trainer: 'Mike Chen', status: 'confirmed' },
        { time: '6:00 PM', type: 'Yoga Class', trainer: 'Sarah Wilson', status: 'available' }
      ]
    },
    { 
      day: 'Tuesday', 
      sessions: [
        { time: '8:00 AM', type: 'Cardio Blast', trainer: 'John Davis', status: 'booked' },
        { time: '7:00 PM', type: 'Strength Training', trainer: 'Mike Chen', status: 'available' }
      ]
    },
    { 
      day: 'Wednesday', 
      sessions: [
        { time: '7:30 AM', type: 'Personal Training', trainer: 'Mike Chen', status: 'confirmed' },
        { time: '6:30 PM', type: 'Pilates', trainer: 'Emma Roberts', status: 'available' }
      ]
    },
    { 
      day: 'Thursday', 
      sessions: [
        { time: '8:00 AM', type: 'HIIT Class', trainer: 'John Davis', status: 'available' },
        { time: '7:00 PM', type: 'Boxing', trainer: 'Alex Turner', status: 'waiting' }
      ]
    },
    { 
      day: 'Friday', 
      sessions: [
        { time: '7:00 AM', type: 'Personal Training', trainer: 'Mike Chen', status: 'confirmed' },
        { time: '5:30 PM', type: 'Zumba', trainer: 'Lisa Park', status: 'available' }
      ]
    },
    { 
      day: 'Saturday', 
      sessions: [
        { time: '9:00 AM', type: 'Yoga Class', trainer: 'Sarah Wilson', status: 'booked' },
        { time: '11:00 AM', type: 'Swimming', trainer: 'Coach Smith', status: 'available' }
      ]
    },
    { 
      day: 'Sunday', 
      sessions: [
        { time: '10:00 AM', type: 'Restorative Yoga', trainer: 'Sarah Wilson', status: 'available' }
      ]
    }
  ];

  const upcomingSessions = [
    { date: 'Today', time: '7:00 AM', type: 'Personal Training', trainer: 'Mike Chen' },
    { date: 'Tomorrow', time: '8:00 AM', type: 'Cardio Blast', trainer: 'John Davis' },
    { date: 'Wednesday', time: '7:30 AM', type: 'Personal Training', trainer: 'Mike Chen' }
  ];

  return (
    <div className="schedule-content">
      <div className="main-header">
        <h1>Schedule 📅</h1>
        <p>Book and manage your training sessions and classes</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="schedule-section">
        <h2>Upcoming Sessions</h2>
        <div className="upcoming-sessions">
          {upcomingSessions.map((session, index) => (
            <div key={index} className="session-card red">
              <div className="session-date">
                <strong>{session.date}</strong>
                <span>{session.time}</span>
              </div>
              <div className="session-info">
                <h3>{session.type}</h3>
                <p>with {session.trainer}</p>
              </div>
              <div className="session-actions">
                <button className="btn-white">Reschedule</button>
                <button className="btn-outline">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="schedule-section">
        <h2>Weekly Schedule</h2>
        <div className="weekly-schedule">
          {weeklySchedule.map((daySchedule, index) => (
            <div key={index} className="day-schedule">
              <div className="day-header">
                <h3>{daySchedule.day}</h3>
              </div>
              <div className="day-sessions">
                {daySchedule.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className={`session-slot ${session.status}`}>
                    <div className="session-time">{session.time}</div>
                    <div className="session-details">
                      <h4>{session.type}</h4>
                      <p>{session.trainer}</p>
                    </div>
                    <div className="session-status">
                      <span className={`status-badge ${session.status}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                      {session.status === 'available' && (
                        <button className="btn-red-small">Book</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Booking */}
      <div className="schedule-section">
        <h2>Quick Book</h2>
        <div className="quick-booking">
          <div className="booking-options">
            <div className="booking-option red">
              <div className="option-icon">💪</div>
              <h3>Personal Training</h3>
              <p>1-on-1 sessions</p>
              <button className="btn-white">Book Now</button>
            </div>
            <div className="booking-option white">
              <div className="option-icon">👥</div>
              <h3>Group Classes</h3>
              <p>Join group sessions</p>
              <button className="btn-red">View Schedule</button>
            </div>
            <div className="booking-option red">
              <div className="option-icon">🏊</div>
              <h3>Swimming</h3>
              <p>Pool sessions</p>
              <button className="btn-white">Check Availability</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;