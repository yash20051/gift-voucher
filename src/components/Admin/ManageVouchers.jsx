import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import './Admin.css';

const ManageVouchers = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const activeProviders = [
    'Luxury Spa & Wellness',
    'FitZone Gym',
    'Glamour Salon'
  ];

  const [newVoucher, setNewVoucher] = useState({
    name: '',
    type: 'promotional',
    value: '',
    provider: 'Luxury Spa & Wellness',
    validityDays: '90'
  });

  const [editingVoucher, setEditingVoucher] = useState(null);

  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('provider_vouchers');
    if (stored) {
      setVouchers(JSON.parse(stored));
    } else {
      const defaultList = [
        {
          id: 1,
          name: 'Festival Special Offer',
          provider: 'Luxury Spa & Wellness',
          category: 'spa',
          type: 'Promotional',
          value: 1000,
          issued: 150,
          redeemed: 95,
          active: true,
          status: 'active',
          validityDays: 90,
          description: 'Special festival offer for Spa services',
          rating: 4.8,
          reviews: 156,
          image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
          discount: 10
        },
        {
          id: 2,
          name: 'Referral Reward',
          provider: 'FitZone Gym',
          category: 'gym',
          type: 'Referral',
          value: 500,
          issued: 280,
          redeemed: 210,
          active: true,
          status: 'active',
          validityDays: 180,
          description: 'Invite your friends and earn gym vouchers',
          rating: 4.5,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
          discount: 0
        },
        {
          id: 3,
          name: 'Corporate Gift Package',
          provider: 'Glamour Salon',
          category: 'salon',
          type: 'Corporate',
          value: 5000,
          issued: 45,
          redeemed: 30,
          active: true,
          status: 'active',
          validityDays: 120,
          description: 'Corporate wellness and beauty packages',
          rating: 4.9,
          reviews: 234,
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          discount: 5
        }
      ];
      setVouchers(defaultList);
      localStorage.setItem('provider_vouchers', JSON.stringify(defaultList));
    }
  }, []);

  const saveVouchers = (updated) => {
    setVouchers(updated);
    localStorage.setItem('provider_vouchers', JSON.stringify(updated));
  };

  const filteredVouchers = vouchers.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateVoucher = (e) => {
    e.preventDefault();

    const providerCategories = {
      'Luxury Spa & Wellness': 'spa',
      'FitZone Gym': 'gym',
      'Glamour Salon': 'salon'
    };
    const category = providerCategories[newVoucher.provider] || 'spa';

    const categoryImages = {
      'spa': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      'salon': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      'gym': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      'restaurant': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      'experience': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400'
    };

    const voucher = {
      id: vouchers.length > 0 ? Math.max(...vouchers.map(v => v.id)) + 1 : 1,
      name: newVoucher.name,
      type: newVoucher.type.charAt(0).toUpperCase() + newVoucher.type.slice(1),
      value: parseInt(newVoucher.value),
      provider: newVoucher.provider,
      issued: 0,
      redeemed: 0,
      active: true,
      status: 'active',
      validityDays: 180,
      category: category,
      description: `Special offer from ${newVoucher.provider}`,
      rating: 4.8,
      reviews: 12,
      image: categoryImages[category] || categoryImages['spa'],
      discount: 0
    };

    saveVouchers([voucher, ...vouchers]);
    setShowCreateModal(false);
    setNewVoucher({ name: '', type: 'promotional', value: '', provider: 'Luxury Spa & Wellness', validityDays: '90' });
  };

  const handleDeleteVoucher = (id) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      saveVouchers(vouchers.filter(v => v.id !== id));
    }
  };

  const handleEditVoucher = (voucher) => {
    setEditingVoucher({
      ...voucher,
      type: voucher.type.toLowerCase()
    });
  };

  const handleUpdateVoucher = (e) => {
    e.preventDefault();
    saveVouchers(vouchers.map(v => v.id === editingVoucher.id ? {
      ...v,
      name: editingVoucher.name,
      type: editingVoucher.type.charAt(0).toUpperCase() + editingVoucher.type.slice(1),
      value: parseInt(editingVoucher.value),
      provider: editingVoucher.provider
    } : v));
    setEditingVoucher(null);
  };

  return (
    <div className="manage-vouchers-container">
      <div className="manage-vouchers-header">
        <div>
          <h1>Manage Vouchers</h1>
          <p>Create and manage platform vouchers</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus size={18} />
          Create Voucher
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{vouchers.length}</div>
          <div className="stat-label">Total Vouchers</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">{vouchers.reduce((sum, v) => sum + v.issued, 0)}</div>
          <div className="stat-label">Total Issued</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{vouchers.reduce((sum, v) => sum + v.redeemed, 0)}</div>
          <div className="stat-label">Total Redeemed</div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search vouchers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher Name</th>
                <th>Type</th>
                <th>Value</th>
                <th>Provider</th>
                <th>Issued</th>
                <th>Redeemed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td><strong>{voucher.name}</strong></td>
                  <td>{voucher.type}</td>
                  <td>₹{voucher.value}</td>
                  <td>{voucher.provider}</td>
                  <td>{voucher.issued}</td>
                  <td>{voucher.redeemed}</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <div className="action-buttons-inline">
                      <button 
                        className="btn-icon" 
                        title="Edit"
                        onClick={() => handleEditVoucher(voucher)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon danger" 
                        title="Delete"
                        onClick={() => handleDeleteVoucher(voucher.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Voucher Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Create Voucher</h2>
              <button onClick={() => setShowCreateModal(false)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleCreateVoucher}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Voucher Name*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Diwali Special Offer"
                    value={newVoucher.name}
                    onChange={(e) => setNewVoucher({ ...newVoucher, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Voucher Type*</label>
                  <select
                    className="form-select"
                    value={newVoucher.type}
                    onChange={(e) => setNewVoucher({ ...newVoucher, type: e.target.value })}
                  >
                    <option value="promotional">Promotional</option>
                    <option value="festival">Festival</option>
                    <option value="referral">Referral</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Value (₹)*</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={newVoucher.value}
                    onChange={(e) => setNewVoucher({ ...newVoucher, value: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Assign to Provider *</label>
                  <select
                    className="form-select"
                    value={newVoucher.provider}
                    onChange={(e) => setNewVoucher({ ...newVoucher, provider: e.target.value })}
                    required
                  >
                    {activeProviders.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Voucher Modal */}
      {editingVoucher && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Edit Voucher</h2>
              <button onClick={() => setEditingVoucher(null)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateVoucher}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Voucher Name*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Diwali Special Offer"
                    value={editingVoucher.name}
                    onChange={(e) => setEditingVoucher({ ...editingVoucher, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Voucher Type*</label>
                  <select
                    className="form-select"
                    value={editingVoucher.type}
                    onChange={(e) => setEditingVoucher({ ...editingVoucher, type: e.target.value })}
                  >
                    <option value="promotional">Promotional</option>
                    <option value="festival">Festival</option>
                    <option value="referral">Referral</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Value (₹)*</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={editingVoucher.value}
                    onChange={(e) => setEditingVoucher({ ...editingVoucher, value: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Assign to Provider *</label>
                  <select
                    className="form-select"
                    value={editingVoucher.provider}
                    onChange={(e) => setEditingVoucher({ ...editingVoucher, provider: e.target.value })}
                    required
                  >
                    {activeProviders.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setEditingVoucher(null)} className="btn btn-outline">
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

export default ManageVouchers;
