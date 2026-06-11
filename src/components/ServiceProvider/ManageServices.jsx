import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import './ServiceProvider.css';

const ManageServices = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const [newService, setNewService] = useState({
    name: '',
    category: 'spa',
    price: '',
    description: ''
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices([]);
      localStorage.setItem('services', JSON.stringify([]));
    }
  }, []);

  const saveServices = (updatedServices) => {
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const serviceToAdd = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      name: newService.name,
      category: newService.category,
      price: parseInt(newService.price),
      description: newService.description
    };
    const updated = [serviceToAdd, ...services];
    saveServices(updated);
    setShowAddModal(false);
    setNewService({ name: '', category: 'spa', price: '', description: '' });
  };

  const handleEditService = (service) => {
    setEditingService({ ...service });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    const updated = services.map(s => s.id === editingService.id ? {
      ...s,
      name: editingService.name,
      category: editingService.category,
      price: parseInt(editingService.price),
      description: editingService.description
    } : s);
    saveServices(updated);
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service? All vouchers created for this service will remain active.')) {
      const updated = services.filter(s => s.id !== id);
      saveServices(updated);
    }
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'spa': return 'Spa & Wellness';
      case 'salon': return 'Salon & Beauty';
      case 'gym': return 'Gym & Fitness';
      case 'restaurant': return 'Restaurant';
      case 'experience': return 'Experience';
      default: return cat;
    }
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <div>
          <h1>Manage Services</h1>
          <p>Add and manage services offered by your business</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td><strong>{service.name}</strong></td>
                  <td>
                    <span className="badge badge-success" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                      {getCategoryLabel(service.category)}
                    </span>
                  </td>
                  <td>₹{service.price}</td>
                  <td>{service.description || <em style={{ color: '#9ca3af' }}>No description</em>}</td>
                  <td>
                    <div className="action-buttons-inline">
                      <button 
                        className="btn-icon" 
                        title="Edit"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon danger" 
                        title="Delete"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    No services found. Click "Add Service" to create one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Add New Service</h2>
              <button onClick={() => setShowAddModal(false)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleAddService}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Service Name*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Deep Tissue Massage"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category*</label>
                  <select
                    className="form-select"
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  >
                    <option value="spa">Spa & Wellness</option>
                    <option value="salon">Salon & Beauty</option>
                    <option value="gym">Gym & Fitness</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="experience">Experience</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹)*</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 1500"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Brief description of the service..."
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Edit Service</h2>
              <button onClick={() => setEditingService(null)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateService}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Service Name*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Deep Tissue Massage"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category*</label>
                  <select
                    className="form-select"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  >
                    <option value="spa">Spa & Wellness</option>
                    <option value="salon">Salon & Beauty</option>
                    <option value="gym">Gym & Fitness</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="experience">Experience</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹)*</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 1500"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Brief description of the service..."
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setEditingService(null)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
