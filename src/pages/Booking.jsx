import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css';

const GymBooking = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    fitnessLevel: 'beginner',
    goals: [],
    medicalHistory: '',
    trainerPreference: '',
    workoutTime: 'morning',
    membershipPlan: '',
    paymentAmount: '',
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const fitnessGoals = [
    'Weight Loss', 'Muscle Gain', 'Strength Training',
    'Cardio Fitness', 'Flexibility', 'Rehabilitation'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updated = [...formData.goals];
      if (checked) updated.push(value);
      else updated = updated.filter(goal => goal !== value);
      setFormData({ ...formData, goals: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const selectMembership = (plan) => {
    setFormData({
      ...formData,
      membershipPlan: plan,
      paymentAmount: '',
      paymentMethod: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    });
  };

  const selectPaymentAmount = (amount) => {
    setFormData({
      ...formData,
      paymentAmount: amount,
      paymentMethod: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 3) { nextStep(); return; }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const backendData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        gender: formData.gender,
        fitness_level: formData.fitnessLevel,
        goals: formData.goals,
        medical_history: formData.medicalHistory || null,
        trainer_preference: formData.trainerPreference || null,
        workout_time: formData.workoutTime,
        membership_plan: formData.membershipPlan,
        payment_amount: formData.paymentAmount,
        payment_method: formData.paymentMethod,
        card_number: formData.paymentMethod === 'Credit Card' ? formData.cardNumber : null,
        card_name: formData.paymentMethod === 'Credit Card' ? formData.cardName : null,
        expiry: formData.paymentMethod === 'Credit Card' ? formData.expiry : null,
        cvv: formData.paymentMethod === 'Credit Card' ? formData.cvv : null
      };

      const missingFields = [];
      if (!backendData.name) missingFields.push('Full Name');
      if (!backendData.email) missingFields.push('Email');
      if (!backendData.phone) missingFields.push('Phone Number');
      if (!backendData.age) missingFields.push('Age');
      if (!backendData.gender) missingFields.push('Gender');
      if (!backendData.goals.length) missingFields.push('Fitness Goals');
      if (!backendData.workout_time) missingFields.push('Workout Time');
      if (!backendData.membership_plan) missingFields.push('Membership Plan');
      if (!backendData.payment_amount) missingFields.push('Payment Amount');
      if (!backendData.payment_method) missingFields.push('Payment Method');
      if (backendData.payment_method === 'Credit Card') {
        if (!backendData.card_number) missingFields.push('Card Number');
        if (!backendData.card_name) missingFields.push('Card Holder Name');
        if (!backendData.expiry) missingFields.push('Expiry Date');
        if (!backendData.cvv) missingFields.push('CVV');
      }

      if (missingFields.length > 0)
        throw new Error(`Please fill: ${missingFields.join(', ')}`);

      await axios.post('http://127.0.0.1:8000/api/bookings', backendData, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert('Booking Successful! Welcome to Star Strength Gym!');
      setFormData({
        name: '', email: '', phone: '', age: '', gender: '', fitnessLevel: 'beginner',
        goals: [], medicalHistory: '', trainerPreference: '', workoutTime: 'morning',
        membershipPlan: '', paymentAmount: '', paymentMethod: '',
        cardNumber:'', cardName:'', expiry:'', cvv:''
      });
      setStep(1);

    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors)
        setSubmitError(JSON.stringify(error.response.data.errors));
      else
        setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="iron-gym-booking">
      <div className="steel-plate-form">
        <div className="header-section">
          <h1>Star <span>STRENGTH</span> GYM</h1>
          <p className="tagline">Transform your body with our expert trainers</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="form-step">
              <h2>01 PERSONAL DETAILS</h2>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}/>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}/>
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange}/>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="form-step">
              <h2>02 FITNESS GOALS</h2>
              {fitnessGoals.map(goal => (
                <label key={goal}>
                  <input type="checkbox" name="goals" value={goal} checked={formData.goals.includes(goal)} onChange={handleChange}/>
                  {goal}
                </label>
              ))}
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="form-step">
              <h2>03 MEMBERSHIP & PAYMENT</h2>
              <select name="membershipPlan" value={formData.membershipPlan} onChange={(e) => selectMembership(e.target.value)}>
                <option value="">Select Membership</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="elite">Elite</option>
              </select>

              {formData.membershipPlan && (
                <div>
                  <label>Select Payment Amount</label>
                  {['2000','4000','6000','8000','10000'].map(amount => (
                    <button key={amount} type="button" className={formData.paymentAmount===amount?'active':''} onClick={() => selectPaymentAmount(amount)}>{amount} ₹</button>
                  ))}
                </div>
              )}

              {formData.paymentAmount && (
                <div>
                  <label>Select Payment Method</label>
                  {['Credit Card','Debit Card','UPI','Net Banking'].map(method => (
                    <label key={method}>
                      <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod===method} onChange={handleChange}/>
                      {method}
                    </label>
                  ))}
                </div>
              )}

              {formData.paymentMethod === 'Credit Card' && (
                <div className="credit-card-section">
                  <h3>Credit Card Details</h3>
                  <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange}/>
                  <input type="text" name="cardName" placeholder="Card Holder Name" value={formData.cardName} onChange={handleChange}/>
                  <input type="month" name="expiry" placeholder="Expiry" value={formData.expiry} onChange={handleChange}/>
                  <input type="number" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange}/>
                </div>
              )}

              {submitError && <p style={{color:'red'}}>{submitError}</p>}

              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Complete Registration'}</button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default GymBooking;
