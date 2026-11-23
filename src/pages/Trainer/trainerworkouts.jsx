// src/pages/trainer/trainerworkouts.jsx
import React, { useState } from 'react';
import './trainerworkouts.css';

const Workouts = () => {
  const [activeTab, setActiveTab] = useState('myWorkouts');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const workoutCategories = [
    { id: 'all', name: 'All Workouts', count: 15 },
    { id: 'strength', name: 'Strength', count: 6 },
    { id: 'cardio', name: 'Cardio', count: 4 },
    { id: 'flexibility', name: 'Flexibility', count: 3 },
    { id: 'hiit', name: 'HIIT', count: 2 }
  ];

  const workouts = [
    {
      id: 1,
      name: 'Full Body Strength',
      category: 'strength',
      duration: 60,
      difficulty: 'Intermediate',
      exercises: 8,
      clients: 12,
      description: 'Complete full body workout focusing on compound movements',
      exercisesList: [
        { name: 'Barbell Squats', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Bench Press', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Deadlifts', sets: 3, reps: '6-8', rest: '120s' },
        { name: 'Pull-ups', sets: 3, reps: '8-10', rest: '60s' }
      ]
    },
    {
      id: 2,
      name: 'Cardio Blast',
      category: 'cardio',
      duration: 45,
      difficulty: 'Beginner',
      exercises: 6,
      clients: 8,
      description: 'High-intensity cardio workout for fat burning',
      exercisesList: [
        { name: 'Treadmill Sprints', sets: 5, reps: '30s', rest: '60s' },
        { name: 'Jump Rope', sets: 4, reps: '45s', rest: '30s' },
        { name: 'Burpees', sets: 3, reps: '12-15', rest: '45s' }
      ]
    },
    {
      id: 3,
      name: 'Yoga Flow',
      category: 'flexibility',
      duration: 90,
      difficulty: 'All Levels',
      exercises: 12,
      clients: 15,
      description: 'Gentle yoga flow for flexibility and relaxation',
      exercisesList: [
        { name: 'Sun Salutations', sets: 3, reps: '5 cycles', rest: '30s' },
        { name: 'Warrior Poses', sets: 2, reps: '30s hold', rest: '15s' },
        { name: 'Tree Pose', sets: 2, reps: '45s hold', rest: '15s' }
      ]
    },
    {
      id: 4,
      name: 'HIIT Circuit',
      category: 'hiit',
      duration: 30,
      difficulty: 'Advanced',
      exercises: 10,
      clients: 6,
      description: 'High-intensity interval training circuit',
      exercisesList: [
        { name: 'Kettlebell Swings', sets: 4, reps: '20', rest: '30s' },
        { name: 'Box Jumps', sets: 4, reps: '15', rest: '30s' },
        { name: 'Battle Ropes', sets: 4, reps: '45s', rest: '30s' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': '#28a745',
      'Intermediate': '#ffc107',
      'Advanced': '#dc3545',
      'All Levels': '#17a2b8'
    };
    return colors[difficulty] || '#666';
  };

  return (
    <div className="trainer-workouts">
      {/* Header */}
      <div className="workouts-header">
        <h1 className="workouts-title">Workout Plans</h1>
        <button className="create-workout-btn">
          <i className="fas fa-plus"></i>
          Create Workout
        </button>
      </div>

      {/* Tabs */}
      <div className="workouts-tabs">
        <button 
          className={`tab-btn ${activeTab === 'myWorkouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('myWorkouts')}
        >
          My Workouts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('assigned')}
        >
          Assigned
        </button>
      </div>

      <div className="workouts-content">
        {/* Categories Sidebar */}
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <div className="categories-list">
            {workoutCategories.map(category => (
              <div key={category.id} className="category-item">
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.count}</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="workout-stats">
            <div className="stat-card">
              <i className="fas fa-dumbbell"></i>
              <div className="stat-info">
                <h4>15</h4>
                <span>Total Workouts</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <div className="stat-info">
                <h4>24</h4>
                <span>Active Clients</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-clock"></i>
              <div className="stat-info">
                <h4>86%</h4>
                <span>Completion Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="workouts-grid">
          {workouts.map(workout => (
            <div key={workout.id} className="workout-card">
              <div className="workout-header">
                <div className="workout-category">{workout.category}</div>
                <div className="workout-actions">
                  <button className="action-btn edit-btn">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn assign-btn">
                    <i className="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>

              <div className="workout-content">
                <h3>{workout.name}</h3>
                <p className="workout-description">{workout.description}</p>
                
                <div className="workout-meta">
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-dumbbell"></i>
                    <span>{workout.exercises} exercises</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-users"></i>
                    <span>{workout.clients} clients</span>
                  </div>
                </div>

                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(workout.difficulty) }}>
                  {workout.difficulty}
                </div>
              </div>

              <div className="workout-footer">
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedWorkout(workout)}
                >
                  View Details
                </button>
                <button className="start-workout-btn">
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <div className="modal-overlay">
          <div className="workout-modal">
            <div className="modal-header">
              <h2>{selectedWorkout.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedWorkout(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="workout-info">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Category</label>
                    <span>{selectedWorkout.category}</span>
                  </div>
                  <div className="info-item">
                    <label>Duration</label>
                    <span>{selectedWorkout.duration} minutes</span>
                  </div>
                  <div className="info-item">
                    <label>Difficulty</label>
                    <span>{selectedWorkout.difficulty}</span>
                  </div>
                  <div className="info-item">
                    <label>Exercises</label>
                    <span>{selectedWorkout.exercises}</span>
                  </div>
                </div>

                <div className="description-section">
                  <h4>Description</h4>
                  <p>{selectedWorkout.description}</p>
                </div>

                <div className="exercises-section">
                  <h4>Exercises</h4>
                  <div className="exercises-list">
                    {selectedWorkout.exercisesList.map((exercise, index) => (
                      <div key={index} className="exercise-item">
                        <div className="exercise-name">
                          <strong>{exercise.name}</strong>
                        </div>
                        <div className="exercise-details">
                          <span>{exercise.sets} sets</span>
                          <span>{exercise.reps} reps</span>
                          <span>{exercise.rest} rest</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary">Edit Workout</button>
                <button className="btn-primary">Assign to Client</button>
                <button className="btn-primary start-btn">
                  <i className="fas fa-play"></i>
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;