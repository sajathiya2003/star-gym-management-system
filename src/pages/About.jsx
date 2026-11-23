import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function AboutPage() {
  useEffect(() => {
    // Animation for team members
    const teamObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('teamMember--animated');
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.teamMember').forEach(member => {
      teamObserver.observe(member);
    });

    // Animation for history timeline
    const historyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timelineItem--animated');
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timelineItem').forEach(item => {
      historyObserver.observe(item);
    });

    return () => {
      teamObserver.disconnect();
      historyObserver.disconnect();
    };
  }, []);

  return (
    <div className="about">
      {/* Hero Banner */}
      <section className="aboutHero">
        <div className="container">
          <div className="aboutHero__content">
            <h1 className="aboutHero__title">OUR LEGACY</h1>
            <p className="aboutHero__subtitle">Transforming bodies since 2010</p>
          </div>
        </div>
      </section>

      <div className="content-section">
        <div className="mission-section">
          <div className="mission-text">
            <h2>WHO WE ARE</h2>
            <p>
              We are Iron Forge Gym - a powerhouse of fitness innovation where strength meets style. 
              Established in 2010, we've been redefining fitness standards with our cutting-edge facilities, 
              world-class trainers, and results-driven programs.
            </p>
            <p>
              Our black and red aesthetic reflects our philosophy: the discipline of a warrior (black) 
              with the passion of a champion (red). We don't just build muscles - we forge iron wills.
            </p>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" alt="Gym interior" />
          </div>
        </div>

        <div className="values-section">
          <h2>OUR CORE PRINCIPLES</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💪</div>
              <h3>Strength</h3>
              <p>Pushing limits beyond what you thought possible</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔥</div>
              <h3>Intensity</h3>
              <p>Every drop of sweat counts in our arena</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔄</div>
              <h3>Evolution</h3>
              <p>Constant innovation in training methods</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>A brotherhood of iron that supports your journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our History */}
      

      {/* Our Team */}
      <section className="ourTeam">
        <div className="container">
          <div className="sectionHeader">
            <span className="sectionHeader__subtitle">MEET THE TEAM</span>
            <h2 className="sectionHeader__title">IRON LEGENDS</h2>
            <div className="sectionHeader__divider"></div>
          </div>
          <div className="ourTeam__grid">
            <div className="teamMember">
              <div className="teamMember__image">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b" alt="Head Trainer" />
                <div className="teamMember__socialLinks">
                  <a href="#"><i className="icon-instagram"></i></a>
                  <a href="#"><i className="icon-linkedin"></i></a>
                </div>
              </div>
              <div className="teamMember__info">
                <h3>VIKRAM SINGH</h3>
                <p>Head Trainer & Founder</p>
                <p className="teamMember__bio">IFBB Pro with 15+ years experience</p>
              </div>
            </div>
            <div className="teamMember">
              <div className="teamMember__image">
                <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77" alt="Strength Coach" />
                <div className="teamMember__socialLinks">
                  <a href="#"><i className="icon-instagram"></i></a>
                  <a href="#"><i className="icon-linkedin"></i></a>
                </div>
              </div>
              <div className="teamMember__info">
                <h3>RAJESH KUMAR</h3>
                <p>Strength Coach</p>
                <p className="teamMember__bio">Powerlifting national record holder</p>
              </div>
            </div>
            <div className="teamMember">
              <div className="teamMember__image">
                <img src="https://images.unsplash.com/photo-1521805103424-d8f8430e8933" alt="Nutrition Specialist" />
                <div className="teamMember__socialLinks">
                  <a href="#"><i className="icon-instagram"></i></a>
                  <a href="#"><i className="icon-linkedin"></i></a>
                </div>
              </div>
              <div className="teamMember__info">
                <h3>PRIYA PATEL</h3>
                <p>Nutrition Specialist</p>
                <p className="teamMember__bio">Sports nutritionist with MS in Dietetics</p>
              </div>
            </div>
            <div className="teamMember">
              <div className="teamMember__image">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438" alt="Rehab Expert" />
                <div className="teamMember__socialLinks">
                  <a href="#"><i className="icon-instagram"></i></a>
                  <a href="#"><i className="icon-linkedin"></i></a>
                </div>
              </div>
              <div className="teamMember__info">
                <h3>ARUN SHARMA</h3>
                <p>Rehab Expert</p>
                <p className="teamMember__bio">Physical therapist specializing in sports injuries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__row">
            {/* Logo and About Column */}
            <div className="footer__col footer__about">
              <div className="footer__logo">
                <h2>Star Gym</h2>
              </div>
              <p className="footer__aboutText">
                Where ordinary people forge extraordinary bodies through discipline, sweat, and iron.
              </p>
              <div className="footer__social">
                <a href="https://twitter.com" className="footer__socialIcon" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" className="footer__socialIcon" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="mailto:info@ironforge.com" className="footer__socialIcon" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="tel:+919876543210" className="footer__socialIcon" aria-label="Phone">
                  <i className="fas fa-phone-alt"></i>
                </a>
              </div>
            </div>

            {/* Useful Links Column */}
            <div className="footer__col">
              <h4 className="footer__title">QUICK LINKS</h4>
              <ul className="footer__links">
                <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
                <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
                <li><Link to="/gallery"><i className="fas fa-chevron-right"></i> Gallery</Link></li>
                <li><Link to="/services"><i className="fas fa-chevron-right"></i> Training Programs</Link></li>
                <li><Link to="/reviews"><i className="fas fa-chevron-right"></i> Success Stories</Link></li>
                <li><Link to="/price"><i className="fas fa-chevron-right"></i> Membership</Link></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="footer__col">
              <h4 className="footer__title">CONTACT INFO</h4>
              <ul className="footer__contact">
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="footer__contactText">
                    123 Fitness Street, Iron District, IN 600001
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="footer__contactText">
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="footer__contactText">
                    <a href="mailto:info@ironforge.com">info@ironforge.com</a>
                  </div>
                </li>
                <li className="footer__contactItem">
                  <div className="footer__contactIcon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="footer__contactText">
                    Mon-Sun: 5:00 AM - 11:00 PM
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer__col">
              <h4 className="footer__title">NEWSLETTER</h4>
              <p className="footer__newsletterText">
                Get exclusive fitness tips and special offers straight to your inbox.
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
              &copy; {new Date().getFullYear()} IRON FORGE GYM. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;