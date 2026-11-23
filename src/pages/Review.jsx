import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Review.css';

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Wedding Client',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'RK Decorations transformed our wedding venue into a magical fairytale. Their attention to detail was impeccable and they brought our vision to life beyond our expectations.',
      rating: 5,
      category: 'wedding',
      date: 'May 2023'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Corporate Client',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'The team created an incredible atmosphere for our product launch. The modern aesthetic with warm lighting was exactly what we wanted. Professional from start to finish.',
      rating: 4,
      category: 'corporate',
      date: 'March 2023'
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Birthday Celebration',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: 'Absolutely stunning decorations for my mother\'s 60th! The floral arrangements were breathtaking and the team worked seamlessly with our other vendors.',
      rating: 5,
      category: 'celebration',
      date: 'January 2023'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Anniversary Party',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      content: '25 years together deserved something special, and RK delivered. The vintage romantic theme was executed flawlessly. Our guests couldn\'t stop complimenting the decor.',
      rating: 5,
      category: 'celebration',
      date: 'December 2022'
    },
    {
      id: 5,
      name: 'Aisha Rahman',
      role: 'Conference Organizer',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      content: 'We\'ve used RK Decorations for three annual conferences now. Their ability to create professional yet inviting spaces is unmatched. Highly recommend for corporate events.',
      rating: 4,
      category: 'corporate',
      date: 'October 2022'
    },
    {
      id: 6,
      name: 'James & Emily Taylor',
      role: 'Wedding Clients',
      image: 'https://randomuser.me/api/portraits/women/85.jpg',
      content: 'From our first consultation to the big day, the team was incredible. They took our vague ideas and created a cohesive, beautiful design that reflected us perfectly.',
      rating: 5,
      category: 'wedding',
      date: 'September 2022'
    }
  ];

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === activeFilter);

  return (
    <div className="review-page">
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client Experiences</h2>
            <p className="section-subtitle">
              Hear what our clients say about our decoration services. We take pride in creating memorable experiences.
            </p>
            
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Reviews
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'wedding' ? 'active' : ''}`}
                onClick={() => setActiveFilter('wedding')}
              >
                Weddings
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'corporate' ? 'active' : ''}`}
                onClick={() => setActiveFilter('corporate')}
              >
                Corporate
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'celebration' ? 'active' : ''}`}
                onClick={() => setActiveFilter('celebration')}
              >
                Celebrations
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {filteredTestimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="quote-icon">"</div>
                <p className="testimonial-content">{testimonial.content}</p>
                
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <div className="client-info">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="client-image" 
                  />
                  <div className="client-details">
                    <h4 className="client-name">{testimonial.name}</h4>
                    <p className="client-role">{testimonial.role} • {testimonial.date}</p>
                  </div>
                </div>
                
                <div className="testimonial-category">
                  {testimonial.category.charAt(0).toUpperCase() + testimonial.category.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section - Consistent with other pages */}
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

export default Testimonials;