import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function HomePage() {
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    programs: 0,
    transformations: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Contact form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Hero slideshow effect
  useEffect(() => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-nav-dot');
    let currentSlide = 0;
    
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentSlide = index;
    };
    
    const slideInterval = setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 6000);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
      });
    });
    
    return () => clearInterval(slideInterval);
  }, []);

  // Animate stats counter
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const targets = { members: 1500, trainers: 25, programs: 12, transformations: 98 };
      
      Object.keys(targets).forEach(key => {
        let start = 0;
        const target = targets[key];
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setStats(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
          }
        }, 16);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Fade in animation on scroll
  useEffect(() => {
    const observeFadeIn = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.fade-in, .review-card');
    fadeElements.forEach(el => observeFadeIn.observe(el));

    return () => observeFadeIn.disconnect();
  }, []);
  
  return (
    <div className="homepage">
      {/* Hero Section - Red & Black Gym Theme */}
      <section className="hero-section">
        <div className="hero-slideshow">
          {/* Black and red gradient overlay */}
          <div className="color-overlay"></div>
          
          {/* Slides with gym images */}
          <div className="hero-slide" style={{backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}></div>
          <div className="hero-slide" style={{backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}></div>
          <div className="hero-slide" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}></div>
        </div>
        
        <div className="hero-content">
          {/* Decorative elements */}
          <div className="hero-decoration-left"></div>
          <div className="hero-decoration-right"></div>
          
          <h1>
            <span className="hero-title-line">TRANSFORM YOUR</span>
            <span className="hero-title-line accent">BODY & MIND</span>
          </h1>
          <p className="subtitle">
            PREMIUM FITNESS TRAINING FACILITY
          </p>
          <p className="description">
            We provide world-class training programs, nutrition guidance, and the motivation 
            you need to achieve your fitness goals. Join our community of champions.
          </p>
          <div className="cta-buttons">
            <Link to="/auth/RegistrationForm" className="btn btn-primary">
              <span>Join Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </Link>
            <Link to="/programs" className="btn btn-secondary">
              <span>View Programs</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5z"/>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="hero-nav-dots">
          <div className="hero-nav-dot active"></div>
          <div className="hero-nav-dot"></div>
          <div className="hero-nav-dot"></div>
        </div>
      </section>

      {/* About Section - Gym Theme */}
      <section className="about-section">
        <div className="about-container container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <span className="script-heading">About Iron Peak</span>
                <h2 className="main-heading">BUILD YOUR BEST SELF</h2>
              </div>
              
              <div className="text-content">
                <p className="text-paragraph">
                  Founded in 2015, Iron Peak Fitness has transformed thousands of lives through our 
                  scientifically-backed training methods and personalized approach. Our 20,000 sq ft 
                  facility houses state-of-the-art equipment and a team of certified professionals 
                  dedicated to your success.
                </p>
                
                <div className="about-features">
                  <div className="feature-item">
                    <div className="feature-icon">🏋️</div>
                    <div className="feature-text">Cutting-edge Equipment</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">👨‍⚕️</div>
                    <div className="feature-text">Certified Trainers</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🥗</div>
                    <div className="feature-text">Nutrition Plans</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-image">
              <div className="image-frame">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" alt="Gym Interior" />
                <div className="play-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections (Stats, Reviews, Gallery, Contact, Footer) */}
      {/* ... */}
      
    </div>
  );
}


export default HomePage;