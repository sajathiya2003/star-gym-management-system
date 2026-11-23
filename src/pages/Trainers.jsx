import React, { useState } from 'react';
import './Trainers.css';

const TrainersPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const trainerCategories = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength Coaches' },
    { id: 'cardio', name: 'Cardio Specialists' },
    { id: 'hiit', name: 'HIIT Experts' },
    { id: 'yoga', name: 'Yoga Instructors' }
  ];

  const trainersData = [
    {
      id: 1,
      name: 'ARJUN KUMAR',
      title: 'Head Strength Coach',
      category: 'strength',
      experience: '8+ years',
      specialization: 'Powerlifting & Bodybuilding',
      rating: 4.9,
      clients: 250,
      achievements: [
        'National Powerlifting Champion 2022',
        'ISSA Certified Trainer',
        'Specialist in Olympic Lifting'
      ],
      bio: 'Former competitive powerlifter with a passion for transforming physiques through scientific strength training methods.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@arjun_strength', email: 'arjun@ironstrength.com' }
    },
    {
      id: 2,
      name: 'PRIYA SHARMA',
      title: 'Senior Fitness Coach',
      category: 'cardio',
      experience: '6+ years',
      specialization: 'Endurance & Fat Loss',
      rating: 4.8,
      clients: 180,
      achievements: [
        'Marathon Runner',
        'ACE Certified Instructor',
        'Weight Loss Specialist'
      ],
      bio: 'Dedicated to helping clients achieve their weight loss goals through effective cardio and nutrition strategies.',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@priya_fitlife', email: 'priya@ironstrength.com' }
    },
    {
      id: 3,
      name: 'VIKRAM SINGH',
      title: 'HIIT Master Trainer',
      category: 'hiit',
      experience: '7+ years',
      specialization: 'High-Intensity Interval Training',
      rating: 4.9,
      clients: 200,
      achievements: [
        'CrossFit Level 2 Trainer',
        'Functional Fitness Expert',
        'Nutrition Coach Certified'
      ],
      bio: 'Creates intense, results-driven HIIT workouts that push limits and deliver maximum results in minimal time.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@vikram_hiit', email: 'vikram@ironstrength.com' }
    },
    {
      id: 4,
      name: 'ANANYA PATEL',
      title: 'Lead Yoga Instructor',
      category: 'yoga',
      experience: '10+ years',
      specialization: 'Vinyasa & Hatha Yoga',
      rating: 4.9,
      clients: 300,
      achievements: [
        'RYT 500 Certified',
        'Yoga Therapy Specialist',
        'Meditation Guide'
      ],
      bio: 'Brings ancient yoga practices to modern fitness with a focus on flexibility, mobility, and mental wellness.',
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@ananya_yoga', email: 'ananya@ironstrength.com' }
    },
    {
      id: 5,
      name: 'RAJESH MENON',
      title: 'Elite Performance Coach',
      category: 'strength',
      experience: '12+ years',
      specialization: 'Athletic Performance',
      rating: 5.0,
      clients: 150,
      achievements: [
        'Former Professional Athlete',
        'Sports Science Degree',
        'Rehabilitation Specialist'
      ],
      bio: 'Works with athletes and serious fitness enthusiasts to optimize performance and prevent injuries.',
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@rajesh_performance', email: 'rajesh@ironstrength.com' }
    },
    {
      id: 6,
      name: 'NEHA KAPOOR',
      title: 'Functional Fitness Expert',
      category: 'hiit',
      experience: '5+ years',
      specialization: 'Functional Movement & Mobility',
      rating: 4.7,
      clients: 120,
      achievements: [
        'Functional Patterns Certified',
        'Mobility Specialist',
        'Precision Nutrition Coach'
      ],
      bio: 'Focuses on building functional strength that translates to real-world movements and better daily living.',
      image: 'https://images.unsplash.com/photo-1596813362035-e5cc1c6ae7d2?w=400&h=400&fit=crop&crop=face',
      social: { instagram: '@neha_functional', email: 'neha@ironstrength.com' }
    }
  ];

  const filteredTrainers = activeCategory === 'all' 
    ? trainersData 
    : trainersData.filter(trainer => trainer.category === activeCategory);

  const openTrainerModal = (trainer) => {
    setSelectedTrainer(trainer);
  };

  const closeTrainerModal = () => {
    setSelectedTrainer(null);
  };

  return (
    <div className="iron-trainers-container">
      <div className="trainers-header">
        <h1>STAR GYM <span>TRAINERS</span></h1>
        <p className="subtitle">Meet the experts who will transform your fitness journey</p>
      </div>

      <div className="category-filter">
        {trainerCategories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="trainers-grid">
        {filteredTrainers.map(trainer => (
          <div key={trainer.id} className="trainer-card">
            <div className="trainer-image">
              <img 
                src={trainer.image} 
                alt={trainer.name}
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="trainer-avatar-fallback">
                <span className="avatar-initials">
                  {trainer.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="trainer-overlay">
                <button 
                  className="view-profile-btn"
                  onClick={() => openTrainerModal(trainer)}
                >
                  VIEW PROFILE
                </button>
              </div>
            </div>

            <div className="trainer-info">
              <h3>{trainer.name}</h3>
              <p className="trainer-title">{trainer.title}</p>
              
              <div className="trainer-stats">
                <div className="stat">
                  <span className="stat-value">{trainer.experience}</span>
                  <span className="stat-label">Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{trainer.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{trainer.clients}+</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>

              <div className="specialization">
                <span>Specializes in: {trainer.specialization}</span>
              </div>

              <button 
                className="book-session-btn"
                onClick={() => openTrainerModal(trainer)}
              >
                BOOK SESSION
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Modal */}
      {selectedTrainer && (
        <div className="modal-overlay" onClick={closeTrainerModal}>
          <div className="trainer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeTrainerModal}>
              ×
            </button>

            <div className="modal-content">
              <div className="modal-left">
                <img 
                  src={selectedTrainer.image} 
                  alt={selectedTrainer.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="modal-avatar-fallback">
                  <span className="modal-avatar-initials">
                    {selectedTrainer.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="social-links">
                  <a href={`https://instagram.com/${selectedTrainer.social.instagram}`} target="_blank" rel="noopener noreferrer">
                    📸 {selectedTrainer.social.instagram}
                  </a>
                  <a href={`mailto:${selectedTrainer.social.email}`}>
                    ✉️ {selectedTrainer.social.email}
                  </a>
                </div>
              </div>

              <div className="modal-right">
                <h2>{selectedTrainer.name}</h2>
                <p className="modal-title">{selectedTrainer.title}</p>
                
                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="modal-stat-value">{selectedTrainer.experience}</span>
                    <span className="modal-stat-label">Experience</span>
                  </div>
                  <div className="modal-stat">
                    <span className="modal-stat-value">{selectedTrainer.rating}</span>
                    <span className="modal-stat-label">Rating</span>
                  </div>
                  <div className="modal-stat">
                    <span className="modal-stat-value">{selectedTrainer.clients}+</span>
                    <span className="modal-stat-label">Clients</span>
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Specialization</h4>
                  <p>{selectedTrainer.specialization}</p>
                </div>

                <div className="modal-section">
                  <h4>About</h4>
                  <p>{selectedTrainer.bio}</p>
                </div>

                <div className="modal-section">
                  <h4>Achievements</h4>
                  <ul>
                    {selectedTrainer.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <button className="modal-book-btn">
                  BOOK PERSONAL TRAINING - ₹1,500/session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersPage;