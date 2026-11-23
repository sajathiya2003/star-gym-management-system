import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      const mockMembers = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' }
      ];

      const mockClasses = [
        { id: 1, name: 'Yoga' },
        { id: 2, name: 'Pilates' },
      ];

      const mockBookings = [
        { id: 1, name: 'John', membership_plan: 'Gold', payment_amount: 2000, payment_status: 'completed', created_at: '2025-10-10T10:00:00' },
        { id: 2, name: 'Jane', membership_plan: 'Silver', payment_amount: 1500, payment_status: 'pending', created_at: '2025-10-09T12:00:00' },
      ];

      const mockPayments = mockBookings.map(b => ({
        id: `#${String(b.id).padStart(3, '0')}`,
        member: b.name,
        amount: b.payment_amount,
        date: new Date(b.created_at).toLocaleDateString(),
        status: b.payment_status,
        plan: b.membership_plan
      }));

      setMembers(mockMembers);
      setClasses(mockClasses);
      setBookings(mockBookings);
      setPayments(mockPayments);
      setLoading(false);
    }, 1000);
  }, []);

  const totalMembers = members.length;
  const totalClasses = classes.length;
  const totalBookings = bookings.length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const lineChartData = {
    labels: bookings.map(b => new Date(b.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue ($)',
        data: bookings.map(b => b.payment_amount),
        fill: false,
        borderColor: '#dc3545',
        tension: 0.2
      }
    ]
  };

  return (
    <div className="dashboard-admin">
      <h1>Dashboard Overview</h1>
      <span>Today: {new Date().toLocaleDateString()}</span>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{totalMembers}</h3>
              <p>Total Members</p>
            </div>
            <div className="stat-card">
              <h3>{totalClasses}</h3>
              <p>Active Classes</p>
            </div>
            <div className="stat-card">
              <h3>{totalBookings}</h3>
              <p>Total Bookings</p>
            </div>
            <div className="stat-card">
              <h3>₹{totalRevenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          {/* Revenue Graph */}
          <div className="graph-card">
            <h2>Revenue Over Time</h2>
            <Line data={lineChartData} options={{ responsive: true }} height={200} />
          </div>

          {/* Payments Summary */}
          <div className="payment-stats">
            <h2>Payment Summary</h2>
            <div className="payment-grid">
              <div>
                <h3>Pending</h3>
                <p>{payments.filter(p => p.status==='pending').length}</p>
              </div>
              <div>
                <h3>Completed</h3>
                <p>{payments.filter(p => p.status==='completed').length}</p>
              </div>
              <div>
                <h3>Average Payment</h3>
                <p>₹{(totalRevenue / (payments.length || 1)).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="recent-payments">
            <h2>Recent Payments</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.slice(-5).reverse().map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.member}</td>
                    <td>{p.plan}</td>
                    <td>₹{p.amount.toLocaleString()}</td>
                    <td>{p.date}</td>
                    <td className={`status-${p.status}`}>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
