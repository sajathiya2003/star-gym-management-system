import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone number is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 16 || formData.age > 80)
      newErrors.age = "Age must be between 16 and 80";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.password_confirmation)
      newErrors.password_confirmation = "Please confirm your password";
    else if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7)
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
      3,
      7
    )} ${phoneNumber.slice(7, 10)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    // 🔥 TEMPORARY MOCK SUCCESS - Set this to false when backend is ready
    const USE_MOCK_SUCCESS = false;
    
    if (USE_MOCK_SUCCESS) {
      // Mock successful registration for testing
      console.log("📝 Mock registration with data:", formData);
      
      setTimeout(() => {
        setSuccessMessage(`🎉 Registration successful! Welcome to STAR GYM, ${formData.name}!`);
        setShowSuccessPopup(true);
        
        // Save user data to localStorage
        localStorage.setItem("customerToken", "mock_customer_token_12345");
        localStorage.setItem("customerData", JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          memberId: "STAR" + Math.floor(1000 + Math.random() * 9000)
        }));
        
        console.log("✅ Mock registration successful!");
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            age: "",
            gender: "",
            password: "",
            password_confirmation: "",
          });
        }, 2000);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
        
        setIsSubmitting(false);
      }, 1500);
      return;
    }
    
    try {
      const formattedPhone = formData.phone.replace(/\D/g, "");

      console.log("🚀 Sending registration request...", {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        age: formData.age,
        gender: formData.gender,
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer_register",
        {
          name: formData.name,
          email: formData.email,
          phone: formattedPhone,
          age: formData.age,
          gender: formData.gender,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
        {
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("✅ Registration Response:", response.data);

      if (response.data.success) {
        // ✅ SUCCESS: Show success message and popup
        setSuccessMessage(`🎉 Registration successful! Welcome to STAR GYM, ${formData.name}!`);
        setShowSuccessPopup(true);
        
        // ✅ Save user data to localStorage for auto-login
        localStorage.setItem("customerToken", response.data.token || "customer_logged_in");
        localStorage.setItem("customerData", JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formattedPhone,
          age: formData.age,
          gender: formData.gender
        }));
        
        // ✅ Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
          password: "",
          password_confirmation: "",
        });

        // ✅ Redirect to customer dashboard after 3 seconds
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
        
      } else {
        // ❌ Backend returned success: false
        setErrors({ 
          submit: response.data.message || "Registration failed. Please try again." 
        });
      }
    } catch (error) {
      console.log("❌ Registration error:", error);
      
      // ❌ Handle different types of errors
      if (error.response?.data?.errors) {
        // Laravel validation errors
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        // Backend error message
        setErrors({ submit: error.response.data.message });
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        // Network connection error
        setErrors({ submit: "❌ Cannot connect to server. Please check if backend is running on http://127.0.0.1:8000" });
      } else if (error.request) {
        // No response received
        setErrors({ submit: "❌ No response from server. Please check your connection." });
      } else {
        // Generic error
        setErrors({ submit: "❌ Registration failed. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Popup Component
  const SuccessPopup = () => {
    const [countdown, setCountdown] = useState(3);

    React.useEffect(() => {
      if (showSuccessPopup) {
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [showSuccessPopup]);

    if (!showSuccessPopup) return null;

    return (
      <div className="success-popup-overlay active">
        <div className="success-popup">
          <div className="success-popup-content">
            <div className="success-icon">🎉</div>
            <h2>Registration Successful!</h2>
            <p>Welcome to STAR GYM, {formData.name}!</p>
            <p>Your account has been created successfully.</p>
            <p>
              Redirecting to dashboard in{" "}
              <span className="countdown">{countdown}</span> seconds...
            </p>
            <div className="success-details">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formatPhoneNumber(formData.phone)}</p>
              <p><strong>Member ID:</strong> STAR{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="star-register-container">
      <SuccessPopup />
      
      {/* Debug Info */}
      <div style={{textAlign: 'center', marginBottom: '10px', fontSize: '12px', color: '#666'}}>
        🔥 Mock Mode: ON - Button will work immediately!
      </div>

      <div className="register-card">
        <div className="register-header">
          <div className="logo">
            <span className="star-icon">⭐</span>
            <h1>
              STAR <span>GYM</span>
            </h1>
          </div>
          <p className="tagline">Begin Your Transformation Journey</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register Now</h2>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="your@email.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formatPhoneNumber(formData.phone)}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
                placeholder="123 4567 890"
                maxLength="12"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={errors.age ? "error" : ""}
                placeholder="Age"
                min="16"
                max="80"
              />
              {errors.age && (
                <span className="error-message">{errors.age}</span>
              )}
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={errors.gender ? "error" : ""}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Create Password *</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Create password"
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                className={errors.password_confirmation ? "error" : ""}
                placeholder="Confirm password"
              />
              {errors.password_confirmation && (
                <span className="error-message">
                  {errors.password_confirmation}
                </span>
              )}
            </div>
          </div>

          {/* ✅ Submit Error Message */}
          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Processing Registration...
                </>
              ) : (
                "Complete Registration 🚀"
              )}
            </button>
          </div>

          {/* Debug Info */}
          <div style={{textAlign: 'center', marginTop: '15px', fontSize: '11px', color: '#888'}}>
            Status: {isSubmitting ? "🔄 Processing..." : "✅ Ready"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
