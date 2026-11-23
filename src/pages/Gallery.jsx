import React, { useState, useEffect, useRef } from 'react';

import './Gallery.css'; // Assuming same CSS for black/red theme

const GymFeatures = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

  // Expanded gym equipment and features data with specific images
  const gymFeaturesData = [
    {
      id: 1,
    title: 'TREADMILLS',
    category: 'cardio',
    image: 'https://images.unsplash.com/photo-1596357395104-4d5ef87fb0a0',
    description: 'High-quality treadmills for running and walking. Benefits: Improves cardiovascular health, aids in weight loss, and boosts endurance.',
    specs: 'Multiple speed settings, incline options, touch-screen display'
    },
    {
      id: 2,
      title: 'ELLIPTICAL TRAINERS',
      category: 'cardio',
      image: 'https://images.unsplash.com/photo-1571410278837-8opGXsff3uc',
      description: 'Low-impact cardio machines. Benefits: Full-body workout, reduces joint stress, enhances heart rate and calorie burn.',
      specs: 'Adjustable resistance, digital tracking, stride length adjustment'
    },
    {
      id: 3,
      title: 'STATIONARY BIKES',
      category: 'cardio',
      image: 'https://images.unsplash.com/photo-1664978055035-cFuscBQeRdQ',
      description: 'Indoor cycling equipment. Benefits: Strengthens lower body, improves aerobic capacity, suitable for all fitness levels.',
      specs: 'Spin and recumbent options, heart rate monitors, adjustable seats'
    },
    {
      id: 4,
      title: 'ROWING MACHINES',
      category: 'cardio',
      image: 'https://images.unsplash.com/photo-1519484730709-KkYWWpurqbE',
      description: 'Full-body cardio workout. Benefits: Enhances endurance, strengthens core and upper body, low-impact on joints.',
      specs: 'Water or magnetic resistance, digital performance monitor'
    },
    {
      id: 5,
      title: 'CHEST PRESS MACHINE',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-1597452485639-2c79b7a6907f',
      description: 'Targeted upper body machine. Benefits: Builds chest, shoulders, and triceps strength, improves posture and upper body power.',
      specs: 'Weight stack up to 200kg, ergonomic design, adjustable seat'
    },
    {
      id: 6,
      title: 'LEG PRESS MACHINE',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-1434648957308-JNPvv1u8yRg',
      description: 'Lower body strength builder. Benefits: Develops quads, hamstrings, and glutes, enhances overall leg power and stability.',
      specs: 'Angled platform, safety locks, weight stack up to 300kg'
    },
    {
      id: 7,
      title: 'LAT PULLDOWN MACHINE',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-1713777070000-P1WKUiOl7xg',
      description: 'Upper body strength equipment. Benefits: Targets back, lats, and biceps, improves pulling strength and posture.',
      specs: 'Adjustable thigh pads, weight stack up to 150kg'
    },
    {
      id: 8,
      title: 'SMITH MACHINE',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-1581122584210-d6123606b7d6',
      description: 'Guided barbell system. Benefits: Safe for heavy lifts, supports squats and presses, builds overall strength.',
      specs: 'Counterbalanced bar, safety catches, multi-grip positions'
    },
    {
      id: 9,
      title: 'DUMBBELLS SET',
      category: 'free-weights',
      image: 'https://images.unsplash.com/photo-1697037736000-Tv_9O-c0tcA',
      description: 'Versatile free weights. Benefits: Allows for compound movements, improves muscle balance, and supports progressive overload.',
      specs: 'From 2kg to 50kg, rubber coated, hexagonal design'
    },
    {
      id: 10,
      title: 'BARBELLS AND PLATES',
      category: 'free-weights',
      image: 'https://images.unsplash.com/photo-1605296866985-34b4c66b9a28',
      description: 'Olympic standard bars. Benefits: Essential for powerlifting, builds total body strength, and promotes functional fitness.',
      specs: 'Multiple bar types, bumper plates, up to 400kg capacity'
    },
    {
      id: 11,
      title: 'KETTLEBELLS',
      category: 'functional',
      image: 'https://images.unsplash.com/photo-1579353962963-UrJ-fn2iRUM',
      description: 'Dynamic training tools. Benefits: Enhances grip strength, core stability, and explosive power through swings and presses.',
      specs: 'Cast iron, 4kg to 48kg weights'
    },
    {
      id: 12,
      title: 'BATTLE ROPES',
      category: 'functional',
      image: 'https://images.unsplash.com/photo-1434648957308-U5kQvbQWoG0',
      description: 'High-intensity ropes. Benefits: Boosts cardio and muscular endurance, engages full body, great for HIIT workouts.',
      specs: '50ft length, 1.5-inch diameter, anchored system'
    },
    {
      id: 13,
      title: 'MEDICINE BALLS',
      category: 'functional',
      image: 'https://images.unsplash.com/photo-1584735175097-7d577ab82d90',
      description: 'Versatile training balls. Benefits: Improves explosive power, core strength, and coordination for dynamic movements.',
      specs: '2kg to 10kg, non-slip texture'
    },
    {
      id: 14,
      title: 'PULL-UP BARS',
      category: 'functional',
      image: 'https://images.unsplash.com/photo-1599058918144-d6b03c9fa3a8',
      description: 'Bodyweight exercise station. Benefits: Builds upper body strength, enhances grip and core stability.',
      specs: 'Multi-grip bars, wall or rack mounted'
    },
    {
      id: 15,
      title: 'SAUNA ROOM',
      category: 'amenities',
      image: 'https://images.unsplash.com/photo-1576675762281-48e8f92e4b99',
      description: 'Relaxation facility. Benefits: Promotes muscle recovery, detoxification through sweat, and stress reduction.',
      specs: 'Infrared heating, capacity for 6, cedar wood'
    },
    {
      id: 16,
      title: 'GROUP CLASS STUDIO',
      category: 'amenities',
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
      description: 'Dedicated space for classes. Benefits: Motivational group environment, variety in workouts like yoga, Zumba, and spin.',
      specs: 'Mirrored walls, premium sound system, sprung floor'
    },
    {
      id: 17,
      title: 'LOCKER ROOMS',
      category: 'amenities',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      description: 'Spacious and secure changing areas. Benefits: Provides convenience, privacy, and storage for personal belongings.',
      specs: 'Digital locks, showers, hairdryers'
    },
    {
      id: 18,
      title: 'CARDIO THEATER',
      category: 'amenities',
      image: 'https://images.unsplash.com/photo-1605296867724-fa87a1ef9276',
      description: 'Entertainment during workouts. Benefits: Enhances cardio experience with built-in screens and audio options.',
      specs: 'Personal TV screens, headphone jacks'
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? gymFeaturesData 
    : gymFeaturesData.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', name: 'ALL', icon: '🏋️' },
    { id: 'cardio', name: 'CARDIO', icon: '❤️' },
    { id: 'strength', name: 'STRENGTH', icon: '💪' },
    { id: 'free-weights', name: 'FREE WEIGHTS', icon: '🏋️‍♂️' },
    { id: 'functional', name: 'FUNCTIONAL', icon: '🔥' },
    { id: 'amenities', name: 'AMENITIES', icon: '🛀' }
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImages = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === filteredFeatures.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? filteredFeatures.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') navigateImages('next');
      if (e.key === 'ArrowLeft') navigateImages('prev');
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="gym-gallery-page" ref={galleryRef}>
      <div className="gym-gallery-hero">
        <div className="hero-overlay">
          <h1>STAR GYM EQUIPMENT & FACILITIES</h1>
          <p className="subheading">EXPLORE OUR TOP-TIER GEAR AND AMENITIES</p>
          <div className="red-divider"></div>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="filter-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid-gallery">
        {filteredFeatures.map((item, index) => (
          <div 
            key={item.id}
            className={`gallery-item ${item.category}`}
            onClick={() => openLightbox(index)}
          >
            <div className="image-container">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="gym-meta">
                    <span>⚙️ {item.specs}</span>
                  </div>
                </div>
              </div>
              <div className="category-badge">{item.category.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox">
          <button className="close-btn" onClick={closeLightbox}>✕</button>
          <div className="lightbox-content">
            <img src={filteredFeatures[currentImageIndex].image} 
                 alt={filteredFeatures[currentImageIndex].title} />
            <div className="lightbox-details">
              <h3>{filteredFeatures[currentImageIndex].title}</h3>
              <p>{filteredFeatures[currentImageIndex].description}</p>
              <div className="gym-meta">
                <span>⚙️ {filteredFeatures[currentImageIndex].specs}</span>
              </div>
            </div>
          </div>
          <button className="nav-btn prev" onClick={() => navigateImages('prev')}>❮</button>
          <button className="nav-btn next" onClick={() => navigateImages('next')}>❯</button>
        </div>
      )}
    </div>
  );
};

export default GymFeatures;