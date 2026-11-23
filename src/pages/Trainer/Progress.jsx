// CustomerProgress.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Progress.css";

export default function CustomerProgress() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [query, setQuery] = useState("");

  const [formData, setFormData] = useState({
    current_weight: "",
    target_weight: "",
    height: "",
    fitness_goal: "",
    activity_level: "",
    weekly_workouts: [],
    diet_preference: "",
    medical_conditions: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const workoutDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const fitnessGoals = [
    { value: "weight_loss", label: "Weight Loss" },
    { value: "muscle_gain", label: "Muscle Gain" },
    { value: "maintenance", label: "Maintenance" }
  ];

  const activityLevels = [
    { value: "sedentary", label: "Sedentary (Little or no exercise)" },
    { value: "light", label: "Light (Exercise 1-3 times/week)" },
    { value: "moderate", label: "Moderate (Exercise 4-5 times/week)" },
    { value: "active", label: "Active (Daily or intense 3-4 times/week)" },
    { value: "very_active", label: "Very Active (Intense 6-7 times/week)" }
  ];

  // Fetch Customers from customer_register table
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await axios.get("http://127.0.0.1:8000/api/customers", {
          timeout: 10000,
          headers: { Accept: "application/json" }
        });

        console.log("📦 API Response:", response.data);

        const data = response.data;
        let items = [];
        
        // Handle different response formats
        if (Array.isArray(data)) {
          items = data;
        } else if (data && data.success && Array.isArray(data.data)) {
          items = data.data;
        } else if (data && Array.isArray(data.data)) {
          items = data.data;
        } else if (data && data.data) {
          // Handle object format
          items = Object.values(data.data);
        } else if (data && Array.isArray(data.customers)) {
          items = data.customers;
        }

        console.log("📋 Processed customers:", items);
        
        // Filter only customers with names
        const customersWithNames = items.filter(customer => 
          customer && customer.name && customer.name.trim() !== ''
        );
        
        setCustomers(customersWithNames);
      } catch (error) {
        console.error("❌ Error fetching customers:", error);
        if (error.code === 'ECONNREFUSED') {
          setApiError("Cannot connect to server. Make sure Laravel backend is running on http://127.0.0.1:8000");
        } else {
          setApiError("Failed to fetch customers: " + (error.response?.data?.message || error.message));
        }
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle Customer Selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomerId(customer.id);
    setSelectedCustomer(customer);
    setShowProgressForm(true);
    setErrors({});
    setSuccessMessage("");

    // Reset form
    setFormData({
      current_weight: "",
      target_weight: "",
      height: "",
      fitness_goal: "",
      activity_level: "",
      weekly_workouts: [],
      diet_preference: "",
      medical_conditions: ""
    });
  };

  const handleWorkoutToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      weekly_workouts: prev.weekly_workouts.includes(day)
        ? prev.weekly_workouts.filter(d => d !== day)
        : [...prev.weekly_workouts, day]
    }));
    if (errors.weekly_workouts) setErrors(prev => ({ ...prev, weekly_workouts: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.current_weight) newErrors.current_weight = "Current weight required";
    if (!formData.target_weight) newErrors.target_weight = "Target weight required";
    if (!formData.height) newErrors.height = "Height required";
    if (!formData.fitness_goal) newErrors.fitness_goal = "Fitness goal required";
    if (!formData.activity_level) newErrors.activity_level = "Activity level required";
    if (formData.weekly_workouts.length === 0) newErrors.weekly_workouts = "Select at least one workout day";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!selectedCustomerId) {
      setErrors({ submit: "Select a customer first" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      console.log("📤 Sending progress data:", {
        customer_id: selectedCustomerId,
        ...formData
      });

      const payload = { 
        customer_id: selectedCustomerId, 
        current_weight: parseFloat(formData.current_weight),
        target_weight: parseFloat(formData.target_weight),
        height: parseFloat(formData.height),
        fitness_goal: formData.fitness_goal,
        activity_level: formData.activity_level,
        weekly_workouts: formData.weekly_workouts,
        diet_preference: formData.diet_preference,
        medical_conditions: formData.medical_conditions
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/progress", 
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log("✅ Save progress response:", response.data);

      if (response.data && response.data.success) {
        setSuccessMessage("✅ Progress saved successfully!");
        // Reset form
        setFormData({
          current_weight: "",
          target_weight: "",
          height: "",
          fitness_goal: "",
          activity_level: "",
          weekly_workouts: [],
          diet_preference: "",
          medical_conditions: ""
        });
        
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error(response.data?.message || 'Failed to save progress');
      }
    } catch (error) {
      console.error("❌ Error saving progress:", error);
      
      let errorMessage = "Failed to save progress. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        if (serverError.errors) {
          // Laravel validation errors
          const firstError = Object.values(serverError.errors)[0][0];
          errorMessage = firstError || serverError.message || errorMessage;
        } else {
          errorMessage = serverError.message || errorMessage;
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "No response from server. Please check if backend is running.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter customers for search
  const filtered = customers.filter(c => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (c.name || "").toLowerCase().includes(q) || 
           (c.email || "").toLowerCase().includes(q) ||
           (c.phone || "").toLowerCase().includes(q);
  });

  if (loading) return (
    <div className="progress-loading-container">
      <div className="progress-spinner"></div>
      <p>Loading customers...</p>
    </div>
  );

  return (
    <div className="customer-progress-page">
      <div className="progress-glass-header">
        <h1>💪 Fitness Progress Tracker</h1>
        <p>Track customer fitness goals and progress</p>
      </div>

      {apiError && <div className="progress-error-banner">{apiError}</div>}
      {successMessage && <div className="progress-success-banner">{successMessage}</div>}

      <div className="progress-content-grid">
        {/* Customer List Section */}
        <div className="progress-customer-section">
          <div className="progress-section-header">
            <h2>🏃‍♂️ Registered Customers</h2>
            <div className="progress-search-box">
              <input
                type="search"
                placeholder="Search customers by name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="progress-search-input"
              />
              <span className="progress-search-icon">🔍</span>
            </div>
          </div>

          <div className="progress-customers-grid">
            {filtered.length === 0 ? (
              <div className="progress-empty-state">
                <div className="progress-empty-icon">👥</div>
                <p>No customers found</p>
                {customers.length === 0 && (
                  <p className="progress-no-customers">No registered customers found</p>
                )}
              </div>
            ) : (
              filtered.map(customer => (
                <div 
                  key={customer.id} 
                  className={`progress-customer-card ${selectedCustomerId === customer.id ? 'progress-selected' : ''}`}
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <div className="progress-customer-avatar">
                    {customer.name ? customer.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div className="progress-customer-info">
                    <h3>{customer.name}</h3>
                    <p>{customer.email}</p>
                    {customer.phone && <p className="progress-customer-phone">📞 {customer.phone}</p>}
                  </div>
                  <div className="progress-select-indicator">
                    {selectedCustomerId === customer.id ? '✅' : '👉'}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="progress-customer-count">
            {customers.length > 0 && `Showing ${filtered.length} of ${customers.length} customers`}
          </div>
        </div>

        {/* Progress Form Section */}
        <div className="progress-form-section">
          {showProgressForm && selectedCustomer ? (
            <div className="progress-form-container">
              <div className="progress-form-header">
                <h2>📊 Track Progress</h2>
                <div className="progress-customer-badge">
                  <strong>👤 {selectedCustomer.name}</strong>
                  <span>📧 {selectedCustomer.email}</span>
                  {selectedCustomer.phone && <span>📞 {selectedCustomer.phone}</span>}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="progress-track-form">
                <div className="progress-form-row">
                  <div className="progress-form-group">
                    <label>Current Weight (kg) *</label>
                    <input 
                      type="number" 
                      name="current_weight" 
                      value={formData.current_weight} 
                      onChange={handleChange}
                      placeholder="70.5"
                      step="0.1"
                      min="30"
                      max="200"
                    />
                    {errors.current_weight && <span className="progress-error">{errors.current_weight}</span>}
                  </div>

                  <div className="progress-form-group">
                    <label>Target Weight (kg) *</label>
                    <input 
                      type="number" 
                      name="target_weight" 
                      value={formData.target_weight} 
                      onChange={handleChange}
                      placeholder="65.0"
                      step="0.1"
                      min="30"
                      max="200"
                    />
                    {errors.target_weight && <span className="progress-error">{errors.target_weight}</span>}
                  </div>
                </div>

                <div className="progress-form-group">
                  <label>Height (cm) *</label>
                  <input 
                    type="number" 
                    name="height" 
                    value={formData.height} 
                    onChange={handleChange}
                    placeholder="175"
                    min="100"
                    max="250"
                  />
                  {errors.height && <span className="progress-error">{errors.height}</span>}
                </div>

                <div className="progress-form-row">
                  <div className="progress-form-group">
                    <label>Fitness Goal *</label>
                    <select name="fitness_goal" value={formData.fitness_goal} onChange={handleChange}>
                      <option value="">Select Goal</option>
                      {fitnessGoals.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                    {errors.fitness_goal && <span className="progress-error">{errors.fitness_goal}</span>}
                  </div>

                  <div className="progress-form-group">
                    <label>Activity Level *</label>
                    <select name="activity_level" value={formData.activity_level} onChange={handleChange}>
                      <option value="">Select Level</option>
                      {activityLevels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                    {errors.activity_level && <span className="progress-error">{errors.activity_level}</span>}
                  </div>
                </div>

                <div className="progress-form-group">
                  <label>Workout Days * ({formData.weekly_workouts.length} selected)</label>
                  <div className="progress-workout-days">
                    {workoutDays.map(day => (
                      <button
                        type="button"
                        key={day}
                        className={`progress-day-btn ${formData.weekly_workouts.includes(day) ? 'progress-active' : ''}`}
                        onClick={() => handleWorkoutToggle(day)}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                  {errors.weekly_workouts && <span className="progress-error">{errors.weekly_workouts}</span>}
                </div>

                <div className="progress-form-group">
                  <label>Diet Preference</label>
                  <input 
                    type="text" 
                    name="diet_preference" 
                    value={formData.diet_preference} 
                    onChange={handleChange}
                    placeholder="e.g., Vegetarian, Keto, Low-carb"
                  />
                </div>

                <div className="progress-form-group">
                  <label>Medical Conditions & Notes</label>
                  <textarea 
                    name="medical_conditions" 
                    value={formData.medical_conditions} 
                    onChange={handleChange}
                    placeholder="Any medical conditions, allergies, or special notes..."
                    rows="3"
                  />
                </div>

                {errors.submit && <div className="progress-error progress-submit-error">{errors.submit}</div>}

                <button type="submit" className="progress-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="progress-btn-spinner"></div>
                      Saving Progress...
                    </>
                  ) : (
                    "💾 Save Progress"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="progress-empty-form-state">
              <div className="progress-empty-form-icon">📝</div>
              <h3>Select a Customer</h3>
              <p>Choose a customer from the list to start tracking their fitness progress</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}