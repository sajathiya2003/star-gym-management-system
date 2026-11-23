import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const CustomerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved credentials if remember me was checked
    const savedUsername = localStorage.getItem("customerUsername");
    const savedPassword = localStorage.getItem("customerPassword");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      alert("Please enter both email and password!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer_login",
        {
          email: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        // ✅ Login success
        alert(response.data.message); // e.g. "Login Successful! Welcome back to STAR GYM!"

        // Save token & customer data
        localStorage.setItem("customerToken", response.data.token || "customer_logged_in");
        localStorage.setItem(
          "customerData",
          JSON.stringify(response.data.data)
        );

        // Remember me functionality
        if (rememberMe) {
          localStorage.setItem("customerUsername", username);
          localStorage.setItem("customerPassword", password);
        } else {
          localStorage.removeItem("customerUsername");
          localStorage.removeItem("customerPassword");
        }

        // Redirect to dashboard
        navigate("/customer/dashboard");
      } else {
        // ❌ Invalid credentials or not registered
        alert(response.data.message || "Invalid credentials! Please register first.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Invalid credentials! Please check your email and password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupRedirect = () => navigate("/customer/signup");
  const handleForgotPassword = () => navigate("/customer/forgot-password");

  return (
    <div className="customer-login-container">
      <div className="customer-login-card">
        <div className="customer-logo">
          <h1>STAR<span>GYM</span></h1>
          <p>MEMBER ACCESS PORTAL</p>
        </div>

        <div className="customer-welcome">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your membership dashboard</p>
        </div>

        <form className="customer-login-form" onSubmit={handleSubmit}>
          <div className="customer-form-group">
            <label htmlFor="customerUsername">EMAIL</label>
            <input
              type="email"
              id="customerUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="customer-form-group">
            <label htmlFor="customerPassword">PASSWORD</label>
            <input
              type="password"
              id="customerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="customer-options">
            <div className="customer-remember">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button
              type="button"
              className="customer-forgot-password"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="customer-login-button"
            disabled={isLoading}
          >
            {isLoading ? "SIGNING IN..." : "MEMBER LOGIN"}
          </button>
        </form>

        <div className="customer-signup-section">
          <p>Don't have an account?</p>
          <button
            className="customer-signup-button"
            onClick={handleSignupRedirect}
            disabled={isLoading}
          >
            CREATE MEMBER ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
