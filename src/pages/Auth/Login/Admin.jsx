import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminTrainerLogin = () => {
  const [activeRole, setActiveRole] = useState(localStorage.getItem("role") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Simple Trainer demo accounts
  const trainerAccounts = [
    { username: "john", password: "john123", name: "John Trainer" },
    { username: "sarah", password: "sarah123", name: "Sarah Wilson" },
    { username: "mike", password: "mike123", name: "Mike Johnson" },
    { username: "emily", password: "emily123", name: "Emily Davis" },
    { username: "david", password: "david123", name: "David Brown" }
  ];

  useEffect(() => {
    localStorage.setItem("role", activeRole);
  }, [activeRole]);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setUsername("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activeRole) {
      alert("Please select a role first!");
      return;
    }

    // Admin credentials
    if (
      activeRole === "admin" &&
      username.toLowerCase() === "admin" &&
      password === "2003"
    ) {
      alert("Login Successful!");
      setPassword("");
      navigate("/admin/dashboard");
      return;
    }

    // Trainer credentials check
    if (activeRole === "trainer") {
      const foundTrainer = trainerAccounts.find(
        trainer => 
          trainer.username.toLowerCase() === username.toLowerCase() && 
          trainer.password === password
      );

      if (foundTrainer) {
        alert(`Login Successful! Welcome ${foundTrainer.name}`);
        setPassword("");
        localStorage.setItem("trainerInfo", JSON.stringify(foundTrainer));
        navigate("/trainer/dashboard");
        return;
      }
    }

    alert("Invalid credentials! Please try again.");
  };

  return (
    <div className="admin-trainer-login-container">
      <div className="admin-trainer-login-card">
        <div className="at-logo">
          <h1>
            STAR<span>GYM</span>
          </h1>
          <p>STAFF ACCESS PORTAL</p>
        </div>

        {/* Role Selection */}
        <div className="at-role-selection">
          {["admin", "trainer"].map((role) => (
            <div
              key={role}
              className={`at-role-option ${activeRole === role ? "at-active" : ""}`}
              onClick={() => handleRoleChange(role)}
            >
              <i
                className={`fas ${
                  role === "admin"
                    ? "fa-crown"
                    : "fa-dumbbell"
                }`}
              ></i>
              <h3>{role.toUpperCase()}</h3>
            </div>
          ))}
        </div>

        {/* Login Form */}
        <form className="at-login-form" onSubmit={handleSubmit}>
          <div className="at-form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i> USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={activeRole === "admin" ? "Enter admin username" : "Enter trainer username"}
              required
            />
          </div>
          
          <div className="at-form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> PASSWORD
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="password-input-with-icon"
              />
              <span 
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>
          
          <button type="submit" className="at-login-button">
            STAFF LOGIN
          </button>
        </form>

        {/* Extra Links */}
        <div className="at-links">
          <a href="#">Staff Support</a>
          <a href="#">Reset Password</a>
        </div>

        <div className="at-divider"></div>

        {/* Role Description */}
        {!activeRole && (
          <div className="at-role-description at-active">
            <h3>Staff Access Portal</h3>
            <p>Select Admin or Trainer role to access staff features</p>
          </div>
        )}

        <div className={`at-role-description ${activeRole === "admin" ? "at-active" : ""}`}>
          <h3>Administrator Access</h3>
          <p>Full system access - Manage members, trainers, and gym operations</p>
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>2003</code></p>
          </div>
        </div>
        
        <div className={`at-role-description ${activeRole === "trainer" ? "at-active" : ""}`}>
          <h3>Trainer Access</h3>
          <p>Manage clients, schedules, and training sessions</p>
          <div className="demo-credentials">
            <p><strong>Demo Trainer Accounts:</strong></p>
            {trainerAccounts.map((trainer, index) => (
              <div key={index} className="trainer-account">
                <p>
                  <strong>{trainer.name}</strong><br />
                  Username: <code>{trainer.username}</code><br />
                  Password: <code>{trainer.password}</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTrainerLogin;