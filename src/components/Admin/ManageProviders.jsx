import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Edit, Plus } from 'lucide-react';
import './Admin.css';

const ManageProviders = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProvider, setNewProvider] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    category: 'spa',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: ''
  });

  const [providers, setProviders] = useState([
    {
      id: 1,
      businessName: 'Luxury Spa & Wellness',
      email: 'contact@luxuryspa.com',
      phone: '+91 9876543210',
      category: 'Spa & Wellness',
      status: 'active',
      vouchers: 8,
      sales: 145,
      joinedDate: '2026-01-15'
    },
    {
      id: 2,
      businessName: 'FitZone Gym',
      email: 'info@fitzone.com',
      phone: '+91 9876543211',
      category: 'Gym & Fitness',
      status: 'active',
      vouchers: 5,
      sales: 98,
      joinedDate: '2026-02-20'
    },
    {
      id: 3,
      businessName: 'Glamour Salon',
      email: 'hello@glamour.com',
      phone: '+91 9876543212',
      category: 'Salon & Beauty',
      status: 'pending',
      vouchers: 0,
      sales: 0,
      joinedDate: '2026-06-08'
    }
  ]);

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleAddProvider = (e) => {
    e.preventDefault();
    const provider = {
      id: providers.length + 1,
      businessName: newProvider.businessName,
      email: newProvider.email,
      phone: newProvider.phone,
      category: newProvider.category,
      status: 'active',
      vouchers: 0,
      sales: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setProviders([provider, ...providers]);
    setShowAddModal(false);
    setNewProvider({
      businessName: '',
      email: '',
      phone: '',
      password: '',
      category: 'spa',
      address: '',
      city: '',
      state: '',
      pincode: '',
      description: ''
    });
    alert('Service Provider added successfully!');
  };

  return (
    <div className="manage-providers-container">
      <div className="manage-providers-header">
        <div>
          <h1>Manage Service Providers</h1>
          <p>Monitor and manage all service providers</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} />
          Add Service Provider
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{providers.filter(p => p.status === 'active').length}</div>
          <div className="stat-label">Active Providers</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{providers.filter(p => p.status === 'pending').length}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">{providers.length}</div>
          <div className="stat-label">Total Providers</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="search-filter-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Providers Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Category</th>
                <th>Vouchers</th>
                <th>Sales</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider.id}>
                  <td><strong>{provider.businessName}</strong></td>
                  <td>{provider.email}</td>
                  <td>{provider.phone}</td>
                  <td>{provider.category}</td>
                  <td>{provider.vouchers}</td>
                  <td>{provider.sales}</td>
                  <td>{new Date(provider.joinedDate).toLocaleDateString('en-IN')}</td>
                  <td>
                    {provider.status === 'active' && <span className="badge badge-success">Active</span>}
                    {provider.status === 'pending' && <span className="badge badge-warning">Pending</span>}
                    {provider.status === 'suspended' && <span className="badge badge-danger">Suspended</span>}
                  </td>
                  <td>
                    <div className="action-buttons-inline">
                      <button className="btn-icon" title="View Details">
                        <Eye size={16} />
                      </button>
                      {provider.status === 'pending' && (
                        <button 
                          className="btn-icon" 
                          title="Approve"
                          onClick={() => updateStatus(provider.id, 'active')}
                        >
                          <CheckCircle size={16} color="#10b981" />
                        </button>
                      )}
                      {provider.status === 'active' && (
                        <button 
                          className="btn-icon danger" 
                          title="Suspend"
                          onClick={() => updateStatus(provider.id, 'suspended')}
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Provider Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h2 className="modal-title">Add New Service Provider</h2>
              <button onClick={() => setShowAddModal(false)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleAddProvider}>
              <div className="modal-body">
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Business Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter business name"
                      value={newProvider.businessName}
                      onChange={(e) => setNewProvider({ ...newProvider, businessName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter email address"
                      value={newProvider.email}
                      onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Enter phone number"
                      value={newProvider.phone}
                      onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Set login password"
                      value={newProvider.password}
                      onChange={(e) => setNewProvider({ ...newProvider, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Category *</label>
                  <select
                    className="form-select"
                    value={newProvider.category}
                    onChange={(e) => setNewProvider({ ...newProvider, category: e.target.value })}
                  >
                    <option value="spa">Spa & Wellness</option>
                    <option value="salon">Salon & Beauty</option>
                    <option value="gym">Gym & Fitness</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="experience">Experience</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe the business..."
                    value={newProvider.description}
                    onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Enter complete address"
                    value={newProvider.address}
                    onChange={(e) => setNewProvider({ ...newProvider, address: e.target.value })}
                    rows="2"
                    required
                  />
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter city"
                      value={newProvider.city}
                      onChange={(e) => setNewProvider({ ...newProvider, city: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter state"
                      value={newProvider.state}
                      onChange={(e) => setNewProvider({ ...newProvider, state: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter pincode"
                    value={newProvider.pincode}
                    onChange={(e) => setNewProvider({ ...newProvider, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={18} />
                  Add Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProviders;
