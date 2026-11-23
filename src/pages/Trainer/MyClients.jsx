// src/pages/trainer/MyClients.jsx
import React, { useState, useEffect } from 'react';
import './MyClients.css';

const MyClients = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    avgProgress: 0,
    sessions: 0
  });

  // Fetch clients data from Laravel backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:8000/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch clients: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Transform the API data to match our component structure
          const transformedClients = data.data.map((customer, index) => {
            // Generate mock data for demonstration (you can replace with actual data)
            const mockData = {
              status: ['active', 'active', 'paused', 'active', 'completed'][index % 5],
              sessions: [12, 8, 6, 3, 20][index % 5],
              progress: [85, 65, 45, 25, 95][index % 5],
              joinDate: ['2024-01-15', '2024-02-01', '2024-01-28', '2024-03-10', '2024-02-20'][index % 5]
            };
            
            return {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone || '+1 (555) 000-0000',
              age: customer.age,
              gender: customer.gender,
              joinDate: customer.created_at ? new Date(customer.created_at).toISOString().split('T')[0] : mockData.joinDate,
              status: mockData.status,
              sessions: mockData.sessions,
              progress: mockData.progress,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=dc3545&color=fff&size=60`
            };
          });
          
          setClients(transformedClients);
          
          // Calculate stats based on transformed data
          const total = transformedClients.length;
          const active = transformedClients.filter(client => client.status === 'active').length;
          const avgProgress = transformedClients.reduce((sum, client) => sum + client.progress, 0) / total;
          const sessions = transformedClients.reduce((sum, client) => sum + client.sessions, 0);
          
          setStats({
            total,
            active,
            avgProgress: Math.round(avgProgress),
            sessions
          });
        } else {
          throw new Error(data.message || 'Failed to fetch clients');
        }
        
      } catch (error) {
        console.error('Error fetching clients:', error);
        // Fallback to sample data if API fails
        const sampleClients = [
          { 
            id: 1, 
            name: 'Sarah Johnson', 
            email: 'sarah@email.com', 
            phone: '+1 (555) 123-4567',
            joinDate: '2024-01-15', 
            status: 'active',
            sessions: 12,
            progress: 85,
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=dc3545&color=fff&size=60'
          },
          { 
            id: 2, 
            name: 'Mike Davis', 
            email: 'mike@email.com', 
            phone: '+1 (555) 987-6543',
            joinDate: '2024-02-01', 
            status: 'active',
            sessions: 8,
            progress: 65,
            avatar: 'https://ui-avatars.com/api/?name=Mike+Davis&background=dc3545&color=fff&size=60'
          },
          { 
            id: 3, 
            name: 'Emma Wilson', 
            email: 'emma@email.com', 
            phone: '+1 (555) 456-7890',
            joinDate: '2024-01-28', 
            status: 'paused',
            sessions: 6,
            progress: 45,
            avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=dc3545&color=fff&size=60'
          }
        ];
        
        setClients(sampleClients);
        setStats({
          total: sampleClients.length,
          active: sampleClients.filter(c => c.status === 'active').length,
          avgProgress: Math.round(sampleClients.reduce((sum, c) => sum + c.progress, 0) / sampleClients.length),
          sessions: sampleClients.reduce((sum, c) => sum + c.sessions, 0)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || client.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'status-active', text: 'Active' },
      paused: { class: 'status-paused', text: 'Paused' },
      completed: { class: 'status-completed', text: 'Completed' }
    };
    return <span className={`status-badge ${statusConfig[status].class}`}>{statusConfig[status].text}</span>;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#28a745';
    if (progress >= 60) return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return (
      <div className="my-clients">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-clients">
      {/* Header */}
      <div className="clients-header">
        <h1 className="clients-title">My Clients</h1>
        <button className="add-client-btn">
          <i className="fas fa-user-plus"></i>
          Add New Client
        </button>
      </div>

      {/* Stats */}
      <div className="clients-stats">
        <div className="client-stat">
          <h3>Total Clients</h3>
          <p className="stat-value">{stats.total}</p>
          <span className="stat-label">Registered</span>
        </div>
        <div className="client-stat">
          <h3>Active</h3>
          <p className="stat-value">{stats.active}</p>
          <span className="stat-label">Currently Training</span>
        </div>
        <div className="client-stat">
          <h3>Avg. Progress</h3>
          <p className="stat-value">{stats.avgProgress}%</p>
          <span className="stat-label">Overall</span>
        </div>
        <div className="client-stat">
          <h3>Sessions</h3>
          <p className="stat-value">{stats.sessions}</p>
          <span className="stat-label">This Month</span>
        </div>
      </div>

      {/* Controls */}
      <div className="clients-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Clients
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'paused' ? 'active' : ''}`}
            onClick={() => setActiveFilter('paused')}
          >
            Paused
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="clients-grid">
        {filteredClients.map((client) => (
          <div key={client.id} className="client-card">
            <div className="client-header">
              <div className="client-avatar">
                <img src={client.avatar} alt={client.name} />
                <div className="online-indicator"></div>
              </div>
              <div className="client-info">
                <h3>{client.name}</h3>
                <p>{client.email}</p>
              </div>
              {getStatusBadge(client.status)}
            </div>

            <div className="client-details">
              <div className="detail-item">
                <i className="fas fa-phone"></i>
                <span>{client.phone}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-calendar"></i>
                <span>Joined {new Date(client.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-dumbbell"></i>
                <span>{client.sessions} sessions</span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Progress</span>
                <span>{client.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${client.progress}%`,
                    backgroundColor: getProgressColor(client.progress)
                  }}
                ></div>
              </div>
            </div>

            <div className="client-actions">
              <button className="action-btn view-btn">
                <i className="fas fa-eye"></i>
                View
              </button>
              <button className="action-btn message-btn">
                <i className="fas fa-comment"></i>
                Message
              </button>
              <button className="action-btn schedule-btn">
                <i className="fas fa-calendar-plus"></i>
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>No clients found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default MyClients;