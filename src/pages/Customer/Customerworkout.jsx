import React from 'react';
import './Customerworkout.css';

const Customerworkout = () => {
  const workouts = [
    { day: 'Monday', type: 'Chest & Triceps', duration: '60 mins', status: 'completed' },
    { day: 'Tuesday', type: 'Back & Biceps', duration: '60 mins', status: 'completed' },
    { day: 'Wednesday', type: 'Leg Day', duration: '75 mins', status: 'upcoming' },
    { day: 'Thursday', type: 'Shoulders & Core', duration: '60 mins', status: 'upcoming' },
    { day: 'Friday', type: 'Full Body', duration: '70 mins', status: 'upcoming' },
    { day: 'Saturday', type: 'Cardio', duration: '45 mins', status: 'rest' },
    { day: 'Sunday', type: 'Rest Day', duration: '-', status: 'rest' }
  ];

  const exercises = [
    { name: 'Bench Press', sets: '3x12', weight: '60kg' },
    { name: 'Incline Dumbbell Press', sets: '3x10', weight: '22.5kg' },
    { name: 'Tricep Pushdown', sets: '3x15', weight: '25kg' },
    { name: 'Cable Crossover', sets: '3x12', weight: '15kg' }
  ];

  return (
    <div className="workout-plan-content">
      <div className="main-header">
        <h1>My Workout Plan 💪</h1>
        <p>Stay consistent with your workout routine and track your progress</p>
      </div>

      {/* Weekly Schedule */}
      <div className="workout-section">
        <h2>Weekly Schedule</h2>
        <div className="week-grid">
          {workouts.map((workout, index) => (
            <div key={index} className={`workout-day ${workout.status}`}>
              <div className="day-header">
                <h3>{workout.day}</h3>
                <span className="duration">{workout.duration}</span>
              </div>
              <p className="workout-type">{workout.type}</p>
              <div className={`status-badge ${workout.status}`}>
                {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Workout */}
      <div className="workout-section">
        <h2>Today's Workout - Chest & Triceps</h2>
        <div className="exercises-list">
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <div className="exercise-info">
                <h4>{exercise.name}</h4>
                <div className="exercise-details">
                  <span>{exercise.sets}</span>
                  <span>{exercise.weight}</span>
                </div>
              </div>
              <div className="exercise-actions">
                <button className="btn-red">Start</button>
                <button className="btn-white">Log</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="workout-stats">
        <div className="stat-item red">
          <h3>Workouts This Week</h3>
          <div className="stat-number">2/5</div>
        </div>
        <div className="stat-item white">
          <h3>Total Exercise Time</h3>
          <div className="stat-number">2h 15m</div>
        </div>
        <div className="stat-item red">
          <h3>Calories Burned</h3>
          <div className="stat-number">1,234</div>
        </div>
      </div>
    </div>
  );
};

export default Customerworkout;