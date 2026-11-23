import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './workouts.css';

const WorkoutsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [workoutsData, setWorkoutsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories will be dynamically created from DB data
  const workoutCategories = [
    { id: 'all', name: 'All Workouts' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'dance', name: 'Dance' },
    { id: 'pilates', name: 'Pilates' },
    { id: 'martial', name: 'Martial Arts' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'flexibility', name: 'Flexibility' }
  ];

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/classes'); // API returning admin-added classes
      const data = response.data.data || response.data;
      setWorkoutsData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setLoading(false);
    }
  };

  const filteredWorkouts = activeTab === 'all'
    ? workoutsData
    : workoutsData.filter(workout => workout.category === activeTab);

  const toggleWorkout = (id) => {
    setExpandedWorkout(expandedWorkout === id ? null : id);
  };

  const getLevelColor = (level) => {
    const colors = {
      'BEGINNER': '#28a745',
      'INTERMEDIATE': '#ffc107',
      'ADVANCED': '#dc3545',
      'ALL LEVELS': '#17a2b8'
    };
    return colors[level] || '#6c757d';
  };

  return (
    <div className="iron-workouts-container">
      <div className="workouts-header">
        <h1>STAR <span>WORKOUTS</span></h1>
        <p className="subtitle">Transform your body with our expert-designed programs</p>

        <div className="category-tabs">
          {workoutCategories.map(category => (
            <button
              key={category.id}
              className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="workouts-grid">
        {loading ? (
          <p>Loading workouts...</p>
        ) : filteredWorkouts.length === 0 ? (
          <p>No workouts available.</p>
        ) : (
          filteredWorkouts.map(workout => (
            <div
              key={workout.id}
              className={`workout-card ${expandedWorkout === workout.id ? 'expanded' : ''}`}
            >
              <div className="card-header" onClick={() => toggleWorkout(workout.id)}>
                <div className="workout-image" style={{
                  backgroundImage: `url(${workout.image_url})`
                }}></div>
                <div className="workout-info">
                  <h3>{workout.name}</h3>
                  <div className="workout-meta">
                    <span className="difficulty">{workout.level}</span>
                    <span>{workout.duration}</span>
                    <span>{workout.capacity} seats</span>
                  </div>
                </div>
                <div className="expand-icon">
                  {expandedWorkout === workout.id ? '−' : '+'}
                </div>
              </div>

              {expandedWorkout === workout.id && (
                <div className="card-details">
                  <p className="description">{workout.description}</p>

                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="exercises-section">
                      <h4>Exercises:</h4>
                      <ul>
                        {workout.exercises.map((ex, index) => (
                          <li key={index}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p><strong>Instructor:</strong> {workout.instructor}</p>
                  <p><strong>Time:</strong> {workout.time}</p>
                  <p><strong>Duration:</strong> {workout.duration}</p>
                  <p><strong>Capacity:</strong> {workout.capacity}</p>
                  <p><strong>Rating:</strong> {workout.rating}</p>

                  <button className="start-workout-btn">
                    JOIN THIS CLASS
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;
