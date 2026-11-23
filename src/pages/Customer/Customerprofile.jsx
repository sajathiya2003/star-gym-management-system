import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerProfile.css";

const CustomerProfile = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [verificationData, setVerificationData] = useState({
    email: "",
    password: ""
  });
  const [editData, setEditData] = useState({});
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://127.0.0.1:8000/api/customers")
      .then((response) => {
        if (response.data.success) {
          setCustomers(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      });
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowVerification(true);
    setVerificationData({
      email: customer.email,
      password: ""
    });
    setVerificationError("");
    setVerificationSuccess("");
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationError("");
    setVerificationSuccess("");

    if (!verificationData.email || !verificationData.password) {
      setVerificationError("Please enter both email and password!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer_login",
        {
          email: verificationData.email,
          password: verificationData.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setVerificationSuccess("✅ Verification Successful! Access granted.");
        
        setTimeout(() => {
          setShowVerification(false);
          setShowDetails(true);
          setVerificationError("");
          setVerificationSuccess("");
        }, 1500);
      } else {
        setVerificationError(response.data.message || "Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      if (error.response?.data?.message) {
        setVerificationError(error.response.data.message);
      } else {
        setVerificationError("Invalid credentials! Please check your email and password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAll = () => {
    setShowVerification(false);
    setShowDetails(false);
    setShowEdit(false);
    setSelectedCustomer(null);
    setVerificationData({ email: "", password: "" });
    setEditData({});
    setVerificationError("");
    setVerificationSuccess("");
    setIsLoading(false);
  };

  const handleEdit = () => {
    setEditData({ ...selectedCustomer });
    setShowDetails(false);
    setShowEdit(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/customers/${selectedCustomer.id}`,
        editData
      );

      if (response.data.success) {
        alert("Customer updated successfully!");
        fetchCustomers();
        setSelectedCustomer(editData);
        setShowEdit(false);
        setShowDetails(true);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Error updating customer!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (customerId, customerName) => {
    if (window.confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone!`)) {
      axios
        .delete(`http://127.0.0.1:8000/api/customers/${customerId}`)
        .then((response) => {
          if (response.data.success) {
            alert("Customer deleted successfully!");
            fetchCustomers();
            handleCloseAll();
          }
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
          alert("Error deleting customer!");
        });
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (id) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];
    return colors[id % colors.length];
  };

  if (loading) {
    return <div className="loading">Loading customer details...</div>;
  }

  return (
    <div className="customer-profile-container">
      <h2>Customer Profiles</h2>
      
      <div className="customer-list">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div className="customer-avatar" 
                   style={{ backgroundColor: getRandomColor(customer.id) }}>
                {customer.image ? (
                  <img src={customer.image} alt={customer.name} />
                ) : (
                  <span className="avatar-initials">
                    {getInitials(customer.name)}
                  </span>
                )}
              </div>
              
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Joined:</strong> {new Date(customer.created_at).toLocaleDateString()}</p>
              </div>
              
              <button 
                className="view-btn"
                onClick={() => handleViewDetails(customer)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No customers found!</p>
        )}
      </div>

      {/* Verification Modal */}
      {showVerification && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content verification-modal">
            <div className="modal-header red-header">
              <h3>Member Verification Required</h3>
              <button className="close-btn" onClick={handleCloseAll}>
                ×
              </button>
            </div>
            
            <div className="verification-body">
              <div className="customer-logo">
                <h1>STAR<span>GYM</span></h1>
                <p>MEMBER VERIFICATION PORTAL</p>
              </div>

              <div className="customer-welcome">
                <h2>Verify Identity</h2>
                <p>Please enter your credentials to view <strong>{selectedCustomer.name}'s</strong> details</p>
              </div>

              <div className="verification-avatar" 
                   style={{ backgroundColor: getRandomColor(selectedCustomer.id) }}>
                {selectedCustomer.image ? (
                  <img src={selectedCustomer.image} alt={selectedCustomer.name} />
                ) : (
                  <span className="avatar-initials">
                    {getInitials(selectedCustomer.name)}
                  </span>
                )}
              </div>

              <form onSubmit={handleVerification} className="customer-login-form">
                <div className="customer-form-group">
                  <label htmlFor="verificationEmail">EMAIL</label>
                  <input
                    type="email"
                    id="verificationEmail"
                    value={verificationData.email}
                    onChange={(e) => setVerificationData({
                      ...verificationData,
                      email: e.target.value
                    })}
                    placeholder="Enter customer's email"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="customer-form-group">
                  <label htmlFor="verificationPassword">PASSWORD</label>
                  <input
                    type="password"
                    id="verificationPassword"
                    value={verificationData.password}
                    onChange={(e) => setVerificationData({
                      ...verificationData,
                      password: e.target.value
                    })}
                    placeholder="Enter password"
                    required
                    disabled={isLoading}
                  />
                </div>

                {verificationError && (
                  <div className="error-message">
                    {verificationError}
                  </div>
                )}

                {verificationSuccess && (
                  <div className="verification-success">
                    {verificationSuccess}
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    type="submit"
                    className="customer-login-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "VERIFYING..." : "VERIFY"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseAll}
                    disabled={isLoading}
                  >
                    CANCEL
                  </button>
                </div>
              </form>

              <div className="verification-note">
                <p>You must enter the correct email and password to access detailed customer information.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {showDetails && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header white-header">
              <h3>Customer Details - {selectedCustomer.name}</h3>
              <button className="close-btn" onClick={handleCloseAll}>
                ×
              </button>
            </div>
            
            <div className="customer-details">
              <div className="detail-avatar" 
                   style={{ backgroundColor: getRandomColor(selectedCustomer.id) }}>
                {selectedCustomer.image ? (
                  <img src={selectedCustomer.image} alt={selectedCustomer.name} />
                ) : (
                  <span className="avatar-initials">
                    {getInitials(selectedCustomer.name)}
                  </span>
                )}
              </div>
              
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Verification Successful! Access granted to customer details.</p>
              </div>
              
              <div className="details-grid">
                <div className="detail-item">
                  <label>Full Name:</label>
                  <span>{selectedCustomer.name}</span>
                </div>
                
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{selectedCustomer.email}</span>
                </div>
                
                <div className="detail-item">
                  <label>Password:</label>
                  <span className="password-field">••••••••</span>
                </div>
                
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{selectedCustomer.phone || "N/A"}</span>
                </div>
                
                <div className="detail-item">
                  <label>Age:</label>
                  <span>{selectedCustomer.age || "N/A"}</span>
                </div>
                
                <div className="detail-item">
                  <label>Gender:</label>
                  <span>{selectedCustomer.gender || "N/A"}</span>
                </div>
                
                <div className="detail-item">
                  <label>Member Since:</label>
                  <span>{new Date(selectedCustomer.created_at).toLocaleDateString()}</span>
                </div>
                
                {selectedCustomer.address && (
                  <div className="detail-item full-width">
                    <label>Address:</label>
                    <span>{selectedCustomer.address}</span>
                  </div>
                )}
                
                {selectedCustomer.membership_type && (
                  <div className="detail-item">
                    <label>Membership Type:</label>
                    <span>{selectedCustomer.membership_type}</span>
                  </div>
                )}
                
                {selectedCustomer.membership_status && (
                  <div className="detail-item">
                    <label>Membership Status:</label>
                    <span className={`status-${selectedCustomer.membership_status.toLowerCase()}`}>
                      {selectedCustomer.membership_status}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="edit-btn"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(selectedCustomer.id, selectedCustomer.name)}
              >
                Delete Account
              </button>
              <button 
                className="cancel-btn"
                onClick={handleCloseAll}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEdit && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header white-header">
              <h3>Edit Customer - {selectedCustomer.name}</h3>
              <button className="close-btn" onClick={handleCloseAll}>
                ×
              </button>
            </div>
            
            <div className="customer-details">
              <form onSubmit={handleSaveEdit} className="edit-form">
                <div className="edit-form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={editData.name || ""}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={editData.phone || ""}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  />
                </div>

                <div className="edit-form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    value={editData.age || ""}
                    onChange={(e) => setEditData({...editData, age: e.target.value})}
                  />
                </div>

                <div className="edit-form-group">
                  <label>Gender:</label>
                  <select
                    value={editData.gender || ""}
                    onChange={(e) => setEditData({...editData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="edit-form-group full-width">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={editData.address || ""}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                  />
                </div>

                <div className="modal-actions">
                  <button 
                    type="submit"
                    className="save-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                  <button 
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowEdit(false);
                      setShowDetails(true);
                    }}
                    disabled={isLoading}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;