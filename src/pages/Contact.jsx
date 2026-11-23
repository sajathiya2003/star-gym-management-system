import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="iron-contact-container">
      {/* Blood Red Header Section */}
      <div className="contact-header">
        <div className="header-overlay">
          <h1>GET IN TOUCH</h1>
          <p>We're here to fuel your fitness journey</p>
          <div className="header-divider"></div>
        </div>
      </div>

      <div className="contact-content">
        {/* Left Side - Contact Info */}
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-box">
              <FaPhone className="contact-icon" />
            </div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <p>+91 87654 32109</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaMapMarkerAlt className="contact-icon" />
            </div>
            <h3>Visit Us</h3>
            <p>IRON TEMPLE GYM</p>
            <p>123 Fitness Street</p>
            <p>Chennai, Tamil Nadu 600001</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaEnvelope className="contact-icon" />
            </div>
            <h3>Email Us</h3>
            <p>info@irontemple.com</p>
            <p>support@irontemple.com</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaClock className="contact-icon" />
            </div>
            <h3>Working Hours</h3>
            <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
            <p>Weekends: 6:00 AM - 10:00 PM</p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form-container">
          <div className="form-header">
            <MdFitnessCenter className="form-icon" />
            <h2>SEND US A MESSAGE</h2>
            <p>Have questions? We've got answers!</p>
          </div>

          <form onSubmit={handleSubmit} className="iron-contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <span className="input-highlight"></span>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <span className="input-highlight"></span>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
              <span className="input-highlight"></span>
            </div>

            <button type="submit" className="submit-btn">
              SEND MESSAGE
            </button>

            {isSubmitted && (
              <div className="success-message">
                Message sent successfully! We'll contact you soon.
              </div>
            )}
          </form>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Gym Location Map */}
      <div className="gym-map">
        <iframe
          title="Gym Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.80123456789!2d80.12345678901234!3d12.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQ0LjQiTiA4MMKwMDcnNDEuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;