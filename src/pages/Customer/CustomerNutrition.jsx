import React from 'react';
import './CustomerNutrition.css';

const CustomerNutrition = () => {
  const dailyMeals = [
    { 
      meal: 'Breakfast', 
      time: '7:00 AM', 
      items: 'Oatmeal with fruits, Protein shake',
      calories: '450',
      status: 'completed'
    },
    { 
      meal: 'Lunch', 
      time: '1:00 PM', 
      items: 'Grilled chicken, Brown rice, Vegetables',
      calories: '650',
      status: 'pending'
    },
    { 
      meal: 'Snack', 
      time: '4:00 PM', 
      items: 'Greek yogurt with nuts',
      calories: '250',
      status: 'pending'
    },
    { 
      meal: 'Dinner', 
      time: '7:00 PM', 
      items: 'Salmon, Quinoa, Steamed broccoli',
      calories: '550',
      status: 'pending'
    }
  ];

  const nutritionGoals = [
    { nutrient: 'Protein', target: '150g', current: '120g', progress: 80 },
    { nutrient: 'Carbs', target: '250g', current: '180g', progress: 72 },
    { nutrient: 'Fats', target: '60g', current: '45g', progress: 75 },
    { nutrient: 'Calories', target: '2200', current: '1890', progress: 86 }
  ];

  return (
    <div className="nutrition-plan-content">
      <div className="main-header">
        <h1>Nutrition Plan 🥗</h1>
        <p>Fuel your body with the right nutrients for optimal performance</p>
      </div>

      {/* Daily Meal Plan */}
      <div className="nutrition-section">
        <h2>Today's Meal Plan</h2>
        <div className="meals-timeline">
          {dailyMeals.map((meal, index) => (
            <div key={index} className={`meal-card ${meal.status}`}>
              <div className="meal-time">{meal.time}</div>
              <div className="meal-content">
                <div className="meal-header">
                  <h3>{meal.meal}</h3>
                  <span className="calories">{meal.calories} cal</span>
                </div>
                <p className="meal-items">{meal.items}</p>
                <div className="meal-actions">
                  <button className={`btn-${meal.status === 'completed' ? 'white' : 'red'}`}>
                    {meal.status === 'completed' ? 'Edit Log' : 'Log Meal'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Goals */}
      <div className="nutrition-section">
        <h2>Nutrition Goals</h2>
        <div className="goals-grid">
          {nutritionGoals.map((goal, index) => (
            <div key={index} className="goal-card">
              <div className="goal-header">
                <h3>{goal.nutrient}</h3>
                <span>{goal.current} / {goal.target}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="progress-text">{goal.progress}% Complete</div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Intake */}
      <div className="nutrition-section">
        <h2>Water Intake Tracking</h2>
        <div className="water-tracker">
          <div className="water-goal">
            <div className="water-icon">💧</div>
            <div className="water-info">
              <h3>Daily Water Goal</h3>
              <span>8 glasses (2 liters)</span>
            </div>
          </div>
          <div className="water-glasses">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(glass => (
              <div key={glass} className={`glass ${glass <= 5 ? 'filled' : ''}`}>
                {glass <= 5 ? '💧' : '○'}
              </div>
            ))}
          </div>
          <button className="btn-red">Log Water Intake</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerNutrition;