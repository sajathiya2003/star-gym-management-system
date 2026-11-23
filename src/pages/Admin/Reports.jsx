import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Reports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('monthly');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/bookings');
      const data = response.data.data || response.data;
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setLoading(false);
    }
  };

  const revenueData = {
    labels: bookings.map(b => new Date(b.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue ($)',
        data: bookings.map(b => parseInt(b.payment_amount.replace(/[^0-9]/g, '')) || 0),
        backgroundColor: '#dc3545'
      }
    ]
  };

  const exportPDF = () => {
    const input = document.getElementById('report-container');
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('booking_report.pdf');
    });
  };

  return (
    <div className="reports-admin">
      <div className="reports-container">
        {/* Header */}
        <div className="reports-header">
          <h1 className="reports-title">Analytics & Reports</h1>
          <div className="report-controls">
            <select
              className="date-range-select"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="export-btn" onClick={exportPDF}>
              Export PDF
            </button>
          </div>
        </div>

        {/* Main Report Content */}
        <div id="report-container">
          {loading ? <p>Loading...</p> : (
            <>
              <div className="chart-section">
                <Bar
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Revenue Chart' }
                    }
                  }}
                />
              </div>

              <div className="data-table-section">
                <h3>Booking Details</h3>
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr key={i}>
                          <td>{b.name}</td>
                          <td>{b.email || 'N/A'}</td>
                          <td>{b.phone || 'N/A'}</td>
                          <td>{b.membership_plan}</td>
                          <td>{b.payment_amount}</td>
                          <td>{new Date(b.created_at).toLocaleDateString()}</td>
                          <td>{b.payment_status || 'Pending'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
