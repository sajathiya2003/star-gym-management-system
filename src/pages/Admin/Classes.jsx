import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Classes.css';

const Classes = () => {
  const [classData, setClassData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newClass, setNewClass] = useState({
    name: '', description: '', instructor: '', category: 'yoga',
    level: 'BEGINNER', time: '', duration: '', capacity: '', image: null, rating: '0'
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Fetch classes from API
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/classes');
      setClassData(response.data);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load classes.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClasses = activeFilter === 'all'
    ? classData
    : classData.filter(cls => cls.category === activeFilter);

  const categories = [
    { id: 'all', name: 'ALL CLASSES', count: classData.length },
    { id: 'yoga', name: 'YOGA', count: classData.filter(c => c.category === 'yoga').length },
    { id: 'strength', name: 'STRENGTH', count: classData.filter(c => c.category === 'strength').length },
    { id: 'cardio', name: 'CARDIO', count: classData.filter(c => c.category === 'cardio').length },
    { id: 'dance', name: 'DANCE', count: classData.filter(c => c.category === 'dance').length },
    { id: 'pilates', name: 'PILATES', count: classData.filter(c => c.category === 'pilates').length },
    { id: 'martial', name: 'MARTIAL ARTS', count: classData.filter(c => c.category === 'martial').length }
  ];

  const getLevelColor = (level) => {
    const colors = {
      'BEGINNER': '#28a745',
      'INTERMEDIATE': '#ffc107',
      'ADVANCED': '#dc3545',
      'ALL LEVELS': '#17a2b8'
    };
    return colors[level] || '#6c757d';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'yoga': 'fas fa-spa',
      'strength': 'fas fa-dumbbell',
      'cardio': 'fas fa-running',
      'dance': 'fas fa-music',
      'pilates': 'fas fa-user',
      'martial': 'fas fa-fist-raised'
    };
    return icons[category] || 'fas fa-dumbbell';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClass(prev => ({ ...prev, image: file }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const validateForm = () => {
    if (!newClass.name.trim()) return 'Name is required';
    if (!newClass.description.trim()) return 'Description is required';
    if (!newClass.instructor.trim()) return 'Instructor name is required';
    if (!newClass.time.trim()) return 'Time is required';
    if (!newClass.duration.trim()) return 'Duration is required';
    if (!newClass.capacity || isNaN(newClass.capacity) || Number(newClass.capacity) < 1) 
      return 'Capacity must be a positive number';
    if (!newClass.image) return 'Image is required';
    return null;
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      alert(validationError);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newClass.name);
      formData.append('description', newClass.description);
      formData.append('instructor', newClass.instructor);
      formData.append('category', newClass.category);
      formData.append('level', newClass.level);
      formData.append('time', newClass.time);
      formData.append('duration', newClass.duration);
      formData.append('capacity', newClass.capacity);
      formData.append('rating', newClass.rating || '0');
      formData.append('image', newClass.image);

      const response = await axios.post('http://127.0.0.1:8000/api/classes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setClassData(prev => [...prev, response.data]);
      setModalData(response.data); // show new class in modal
      setShowModal(true);

      setShowAddForm(false);
      setNewClass({
        name: '', description: '', instructor: '', category: 'yoga',
        level: 'BEGINNER', time: '', duration: '', capacity: '', image: null, rating: '0'
      });
      setImagePreview(null);
    } catch (err) {
      console.error('Error adding class:', err);
      const errorMessage = err.response?.data?.message || 'Unknown error';
      setError('Failed to add class: ' + errorMessage);
      alert('Failed to add class: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="classes-admin">
      {/* Header */}
      <div className="classes-header">
        <div className="header-content">
          <h1 className="classes-title">FITNESS CLASSES</h1>
          <p className="classes-subtitle">Transform Your Body, Elevate Your Spirit</p>
        </div>
        <button className="add-class-btn" onClick={() => setShowAddForm(true)}>
          <i className="fas fa-plus-circle"></i> ADD NEW CLASS
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="add-class-form">
          <h3>Add New Class</h3>
          <form onSubmit={handleAddClass}>
            <input type="text" placeholder="Class Name" value={newClass.name} 
              onChange={e => setNewClass({...newClass, name: e.target.value})} required />
            <textarea placeholder="Description" value={newClass.description}
              onChange={e => setNewClass({...newClass, description: e.target.value})} required />
            <input type="text" placeholder="Instructor" value={newClass.instructor}
              onChange={e => setNewClass({...newClass, instructor: e.target.value})} required />
            <select value={newClass.category} onChange={e => setNewClass({...newClass, category: e.target.value})}>
              <option value="yoga">YOGA</option>
              <option value="strength">STRENGTH</option>
              <option value="cardio">CARDIO</option>
              <option value="dance">DANCE</option>
              <option value="pilates">PILATES</option>
              <option value="martial">MARTIAL ARTS</option>
            </select>
            <select value={newClass.level} onChange={e => setNewClass({...newClass, level: e.target.value})}>
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
              <option value="ALL LEVELS">ALL LEVELS</option>
            </select>
            <input type="time" placeholder="Time" value={newClass.time}
              onChange={e => setNewClass({...newClass, time: e.target.value})} required />
            <input type="text" placeholder="Duration" value={newClass.duration}
              onChange={e => setNewClass({...newClass, duration: e.target.value})} required />
            <input type="text" placeholder="Capacity" value={newClass.capacity}
              onChange={e => setNewClass({...newClass, capacity: e.target.value})} required />
            <div className="image-upload-container">
              <label htmlFor="image-upload" className="image-upload-label">
                Upload Image <i className="fas fa-upload"></i>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />
                </div>
              )}
            </div>
            <input type="number" placeholder="Rating (0-5)" value={newClass.rating}
              onChange={e => setNewClass({...newClass, rating: e.target.value})}
              min="0" max="5" step="0.1" required />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filters */}
      <div className="category-filters">
        <div className="filters-header">
          <h3>CLASS CATEGORIES</h3>
          <span className="filter-count">{filteredClasses.length} CLASSES AVAILABLE</span>
        </div>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              <i className={getCategoryIcon(category.id)}></i>
              <span className="filter-name">{category.name}</span>
              <span className="filter-count-badge">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-image">
              <img src={cls.image_url} alt={cls.name} />
              <div className="class-overlay">
                <span className="class-time"><i className="fas fa-clock"></i>{cls.time}</span>
                <span className="class-level" style={{ backgroundColor: getLevelColor(cls.level) }}>{cls.level}</span>
              </div>
              <div className="class-category">
                <i className={getCategoryIcon(cls.category)}></i>
              </div>
            </div>
            <div className="class-content">
              <div className="class-header">
                <h3 className="class-name">{cls.name}</h3>
                <div className="class-rating"><i className="fas fa-star"></i> {cls.rating}</div>
              </div>
              <p className="class-desc">{cls.description}</p>
              <div className="class-meta">
                <div className="meta-item"><i className="fas fa-user-tie"></i> Trainer: {cls.instructor}</div>
                <div className="meta-item"><i className="fas fa-stopwatch"></i> Duration: {cls.duration}</div>
                <div className="meta-item"><i className="fas fa-users"></i> Capacity: {cls.capacity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-dumbbell"></i>
          <h3>NO CLASSES FOUND</h3>
          <p>Try selecting a different category</p>
        </div>
      )}

      {/* Modal */}
      {showModal && modalData && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-image">
              <img src={modalData.image_url || URL.createObjectURL(modalData.image)} alt={modalData.name} />
            </div>
            <div className="modal-content">
              <h3>{modalData.name}</h3>
              <span className="modal-level" style={{ backgroundColor: getLevelColor(modalData.level) }}>
                {modalData.level}
              </span>
              <p>{modalData.description}</p>
              <div className="modal-meta">
                <div>Instructor: {modalData.instructor}</div>
                <div>Category: {modalData.category.toUpperCase()}</div>
                <div>Time: {modalData.time}</div>
                <div>Duration: {modalData.duration}</div>
                <div>Capacity: {modalData.capacity}</div>
                <div>Rating: {modalData.rating}</div>
              </div>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Classes;
