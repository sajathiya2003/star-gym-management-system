import React, { useState } from 'react';
import './membership.css';



const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const membershipPlans = [
    {
      id: 1,
      name: 'IRON STARTER',
      price: '₹2,500',
      period: '/month',
      popular: false,
      features: [
        '3 days per week access',
        'Standard equipment only',
        'Free fitness assessment',
        'Locker access',
        'Basic group classes',
        'No contract required'
      ],
      buttonText: 'GET STARTED'
    },
    {
      id: 2,
      name: 'IRON WARRIOR',
      price: '₹4,500',
      period: '/month',
      popular: true,
      features: [
        '6 days per week access',
        'All equipment included',
        '2 personal training sessions',
        'Premium locker access',
        'All group classes',
        'Nutrition guidance',
        'Progress tracking'
      ],
      buttonText: 'BECOME WARRIOR'
    },
    {
      id: 3,
      name: 'IRON ELITE',
      price: '₹7,500',
      period: '/month',
      popular: false,
      features: [
        '24/7 unlimited access',
        'Dedicated personal trainer',
        'Custom workout plans',
        'Premium supplements pack',
        'Spa & recovery access',
        'Advanced body analysis',
        'Priority booking',
        'Nutritionist consultation'
      ],
      buttonText: 'GO ELITE'
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <div className="iron-membership-container">
      <div className="membership-header">
        <h1>STAR GYM <span>MEMBERSHIP</span></h1>
        <p className="subtitle">Choose your path to greatness</p>
      </div>

      <div className="benefits-section">
        <h2>WHY CHOOSE IRON STRENGTH?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💪</div>
            <h3>World-Class Equipment</h3>
            <p>Latest strength and cardio machines from premium brands</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏆</div>
            <h3>Expert Trainers</h3>
            <p>Certified professionals with 5+ years experience</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>24/7 Access</h3>
            <p>Train anytime that fits your schedule</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">❤️</div>
            <h3>Recovery Zone</h3>
            <p>Sauna, steam room, and massage therapy</p>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <h2>MEMBERSHIP PLANS</h2>
        <div className="plans-grid">
          {membershipPlans.map(plan => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="check-icon">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                className={`select-btn ${plan.popular ? 'popular-btn' : ''}`}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h2>JOIN IRON STRENGTH</h2>
              <button 
                className="close-btn"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="selected-plan">
                <h3>{selectedPlan.name}</h3>
                <p className="plan-price">{selectedPlan.price}{selectedPlan.period}</p>
              </div>

              <div className="payment-form">
                <div className="form-group">
                  <label>FULL NAME *</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                
                <div className="form-group">
                  <label>EMAIL *</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                
                <div className="form-group">
                  <label>PHONE NUMBER *</label>
                  <input type="tel" placeholder="Enter your phone number" />
                </div>
                
                <div className="form-group">
                  <label>PAYMENT METHOD *</label>
                  <select>
                    <option value="">Select payment method</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>

                <button className="pay-now-btn">
                  PAY NOW - {selectedPlan.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;