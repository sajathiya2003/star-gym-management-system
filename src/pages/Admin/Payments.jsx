// src/pages/admin/Payments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payments.css';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching bookings...');
      const response = await axios.get('http://127.0.0.1:8000/api/bookings', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response);
      const bookingsData = Array.isArray(response.data) ? response.data : (response.data.data || []);
      const bookings = bookingsData.map(booking => ({
        id: `#${String(booking.id).padStart(3, '0')}`,
        member: booking.name,
        email: booking.email || 'N/A',
        phone: booking.phone || 'N/A',
        age: booking.age || 'N/A',
        gender: booking.gender || 'N/A',
        plan: booking.membership_plan || 'N/A',
        package: booking.package_type || 'N/A',
        amount: booking.payment_amount ? `₹${booking.payment_amount.toLocaleString()}` : '₹0',
        date: booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A',
        status: booking.payment_status || 'pending'
      }));
      setPayments(bookings);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching payments:', err);
      if (err.response) {
        setError(`Error: ${err.response.data.message || 'Failed to load data'} (${err.response.status})`);
      } else if (err.request) {
        setError('Server not responding. Please check if the backend server is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === activeTab);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'status-completed', text: 'Completed' },
      pending: { class: 'status-pending', text: 'Pending' },
      failed: { class: 'status-failed', text: 'Failed' }
    };
    const config = statusConfig[status] || { class: '', text: status };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="payments-admin">
      {/* Header */}
      <div className="payments-header">
        <h1 className="payments-title">Payment Management</h1>
        <button className="add-payment-btn">
          <i className="fas fa-plus"></i>
          Add Payment
        </button>
      </div>

      {/* Stats */}
      <div className="payment-stats">
        <div className="payment-stat">
          <h3>Total Revenue</h3>
          <p className="stat-amount">
            ₹{filteredPayments.reduce((sum, payment) => {
              const amount = payment.amount.replace(/[^0-9]/g, '');
              return sum + parseInt(amount || 0);
            }, 0).toLocaleString()}
          </p>
          <span className="stat-period">All Time</span>
        </div>
        <div className="payment-stat">
          <h3>Total Bookings</h3>
          <p className="stat-amount">{filteredPayments.length}</p>
          <span className="stat-period">Members</span>
        </div>
        <div className="payment-stat">
          <h3>Pending Approvals</h3>
          <p className="stat-amount">
            {filteredPayments.filter(p => p.status === 'pending').length}
          </p>
          <span className="stat-period">Bookings</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="payment-tabs">
        {['all','completed','pending','failed'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab===tab?'active':''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="payments-table-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading payments data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchPayments} className="retry-btn">
              <i className="fas fa-sync"></i> Retry
            </button>
          </div>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Member Details</th>
                <th>Contact Info</th>
                <th>Gender</th>
                <th>Plan</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td className="payment-id">{payment.id}</td>
                  <td className="member-details">
                    <div className="member-name">{payment.member}</div>
                    <div className="member-meta">{payment.age} yrs</div>
                  </td>
                  <td className="contact-info">
                    <div>{payment.email}</div>
                    <div>{payment.phone}</div>
                  </td>
                  <td>{payment.gender}</td>
                  <td className="plan-type">{payment.plan}</td>
                  <td>{payment.package}</td>
                  <td className="payment-amount">{payment.amount}</td>
                  <td className="payment-date">{payment.date}</td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td className="action-buttons">
                    <button className="action-btn view-btn" title="View"><i className="fas fa-eye"></i></button>
                    <button className="action-btn approve-btn" title="Approve"><i className="fas fa-check"></i></button>
                    <button className="action-btn delete-btn" title="Delete"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Actions */}
      <div className="payment-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons-grid">
          <button 
            className="quick-action-btn"
            onClick={() => {
              const csvContent = filteredPayments.map(p => 
                `${p.id},${p.member},${p.email},${p.phone},${p.gender},${p.plan},${p.package},${p.amount},${p.date},${p.status}`
              ).join('\n');
              const blob = new Blob([`ID,Member,Email,Phone,Gender,Plan,Package,Amount,Date,Status\n${csvContent}`], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'payments_report.csv';
              a.click();
            }}
          >
            <i className="fas fa-download"></i> Export Report
          </button>
          <button 
            className="quick-action-btn"
            onClick={fetchPayments}
            disabled={loading}
          >
            <i className="fas fa-sync"></i> {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => {
              const pending = filteredPayments.filter(p => p.status==='pending').length;
              alert(`${pending} pending payments to review`);
            }}
          >
            <i className="fas fa-list-check"></i> Check Pending
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
