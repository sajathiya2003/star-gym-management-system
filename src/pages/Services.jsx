import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const serviceCardsRef = useRef([]);

  const packagesData = [
    {
      id: 1,
      title: 'Royal Wedding Package',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Elegant floral and light setup for your dream wedding ceremony.',
      includes: ['Stage Setup', 'Entry Decoration', 'Guest Seating', 'Floral Arrangements', 'Lighting Effects'],
      price: '₹45,000 - ₹70,000',
      duration: '8-10 hours',
      themes: ['Floral Arch', 'Vintage Elegance', 'Traditional', 'Luxury Arrangement']
    },
    {
      id: 2,
      title: 'Premium Birthday Package',
      category: 'birthday',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Vibrant and fun decorations to make birthdays extra special.',
      includes: ['Theme Setup', 'Balloon Decor', 'Photo Booth', 'Table Decorations', 'Custom Backdrop'],
      price: '₹15,000 - ₹30,000',
      duration: '4-6 hours',
      themes: ['Modern Geometric', 'Color Changing Lights', 'Balloon Theme', 'Custom Design']
    },
    {
      id: 3,
      title: 'Corporate Event Package',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Professional decor setup for corporate events and conferences.',
      includes: ['Stage Design', 'Branding Elements', 'Seating Arrangement', 'Lighting Setup', 'Reception Decor'],
      price: '₹35,000 - ₹60,000',
      duration: '6-8 hours',
      themes: ['Modern Geometric', 'LED Panels', 'Minimalist', 'Branded Theme']
    },
    {
      id: 4,
      title: 'Anniversary Special',
      category: 'anniversary',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Romantic decor to celebrate your love story.',
      includes: ['Candle Decor', 'Floral Centerpieces', 'Photo Display', 'Table Settings', 'Lighting Effects'],
      price: '₹25,000 - ₹40,000',
      duration: '5-7 hours',
      themes: ['Vintage Elegance', 'Candlelight', 'Floral Arch', 'Romantic Lights']
    },
    {
      id: 5,
      title: 'Custom Theme Package',
      category: 'custom',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Tailored decorations based on your unique theme and requirements.',
      includes: ['Custom Design', 'Theme Execution', 'Special Lighting', 'Personalized Elements', 'Full Setup'],
      price: 'Custom Quote',
      duration: 'Varies',
      themes: ['Fully Customizable', 'Your Design', 'Mixed Elements', 'Unique Concept']
    },
    {
      id: 6,
      title: 'Intimate Wedding Package',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Beautiful decor for smaller, intimate wedding ceremonies.',
      includes: ['Altar Decor', 'Seating Arrangement', 'Floral Accents', 'Aisle Decor', 'Basic Lighting'],
      price: '₹30,000 - ₹50,000',
      duration: '6-8 hours',
      themes: ['Minimalist', 'Boho Chic', 'Garden Theme', 'Simple Elegance']
    }
  ];

  const filteredPackages = activeCategory === 'all' 
    ? packagesData 
    : packagesData.filter(pkg => pkg.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'birthday', name: 'Birthday' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'custom', name: 'Custom' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    serviceCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredPackages]);

  const handleEnquiry = (packageTitle) => {
    alert(`Enquiry sent for ${packageTitle}! We'll contact you soon.`);
  };

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Decoration Services</h1>
        <p>We provide unique decoration packages for weddings, birthdays, corporate events, and more. Choose the perfect service that suits your occasion.</p>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="packages-container">
        {filteredPackages.map((pkg, index) => (
          <div 
            key={pkg.id}
            className="package-card"
            ref={el => serviceCardsRef.current[index] = el}
          >
            <div className="package-image">
              <img src={pkg.image} alt={pkg.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="package-content">
              <h3>{pkg.title}</h3>
              <p className="description">{pkg.description}</p>
              
              <div className="package-details">
                <h4>What's Included:</h4>
                <ul>
                  {pkg.includes.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
                
                <div className="theme-section">
                  <h4>Available Themes:</h4>
                  <div className="theme-tags">
                    {pkg.themes.map((theme, i) => (
                      <span key={i} className="theme-tag">{theme}</span>
                    ))}
                  </div>
                </div>
                
                <div className="price-duration">
                  {pkg.price !== 'Custom Quote' && <span className="price">{pkg.price}</span>}
                  {pkg.price === 'Custom Quote' && <span className="price custom">Custom Quote</span>}
                  <span className="duration">{pkg.duration}</span>
                </div>
              </div>
              
              <button 
                className="enquire-btn"
                onClick={() => handleEnquiry(pkg.title)}
              >
                Enquire Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section - Consistent with AboutPage */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__row">
            {/* Logo and About Column */}
            <div className="footer__col footer__about">
              <div className="footer__logo">
                <img src="/path-to-your-logo.png" alt="Event Decor Logo" className="footer__logoImg" />
              </div>
              <p className="footer__aboutText">
                We create magical event decorations that transform your special occasions into unforgettable experiences.
              </p>
              <div className="footer__social">
                <a href="https://twitter.com" className="footer__socialIcon" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" className="footer__socialIcon" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="mailto:info@eventdecor.com" className="footer__socialIcon" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="tel:+1234567890" className="footer__socialIcon" aria-label="Phone">
                  <i className="fas fa-phone-alt"></i>
                </a>
              </div>
            </div>

            {/* Useful Links Column */}
            <div className="footer__col">
              <h4 className="footer__title">Quick Links</h4>
              <ul className="footer__links">
                <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
                <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
                <li><Link to="/gallery"><i className="fas fa-chevron-right"></i> Gallery</Link></li>
                <li><Link to="/services"><i className="fas fa-chevron-right"></i> Services</Link></li>
                <li><Link to="/reviews"><i className="fas fa-chevron-right"></i> Reviews</Link></li>
                <li><Link to="/price"><i className="fas fa-chevron-right"></i> Pricing</Link></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="footer__col">
              <h4 className="footer__title">Contact Info</h4>
              <ul className="footer__contact">
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="footer__contactText">
                    123 Event Street, Decor City, DC 12345
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="footer__contactText">
                    <a href="tel:+1234567890">+1 (234) 567-8900</a>
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="footer__contactText">
                    <a href="mailto:info@eventdecor.com">info@eventdecor.com</a>
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="footer__contactText">
                    Mon-Sun: 9:00 AM - 8:00 PM
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer__col">
              <h4 className="footer__title">Newsletter</h4>
              <p className="footer__newsletterText">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="footer__newsletterForm">
                <input type="email" placeholder="Your Email" className="footer__newsletterInput" required />
                <button type="submit" className="footer__newsletterBtn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer__bottom">
          <div className="container">
            <div className="footer__copyrightText">
              &copy; {new Date().getFullYear()} Event Decor. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;