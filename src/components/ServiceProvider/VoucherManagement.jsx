import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import './ServiceProvider.css';

const VoucherManagement = ({ user }) => {
  const [vouchers, setVouchers] = useState([]);
  const [viewingVoucher, setViewingVoucher] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedVouchers = localStorage.getItem('provider_vouchers');
    if (storedVouchers) {
      setVouchers(JSON.parse(storedVouchers));
    } else {
      const defaultVouchers = [
        {
          id: 1,
          name: 'Spa Relaxation Package',
          type: 'Service',
          value: 2000,
          sold: 45,
          active: true,
          validityDays: 180
        },
        {
          id: 2,
          name: 'Full Body Massage',
          type: 'Service',
          value: 2500,
          sold: 38,
          active: true,
          validityDays: 180
        },
        {
          id: 3,
          name: 'Summer Special Offer',
          type: 'Promotional',
          value: 1500,
          sold: 62,
          active: false,
          validityDays: 90
        }
      ];
      setVouchers(defaultVouchers);
      localStorage.setItem('provider_vouchers', JSON.stringify(defaultVouchers));
    }

    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices([]);
    }
  }, []);

  const saveVouchers = (updatedVouchers) => {
    setVouchers(updatedVouchers);
    localStorage.setItem('provider_vouchers', JSON.stringify(updatedVouchers));
  };

  const toggleVoucherStatus = (id) => {
    saveVouchers(vouchers.map(v => v.id === id ? { ...v, active: !v.active } : v));
  };

  const deleteVoucher = (id) => {
    if (confirm('Are you sure you want to delete this voucher?')) {
      saveVouchers(vouchers.filter(v => v.id !== id));
    }
  };

  const handleEditVoucher = (voucher) => {
    const matchedServiceIds = services
      .filter(s => voucher.name.toLowerCase().includes(s.name.toLowerCase()))
      .map(s => s.id);

    setEditingVoucher({
      ...voucher,
      selectedServiceIds: matchedServiceIds
    });
  };

  const handleEditServiceToggle = (id) => {
    let updatedIds;
    if (editingVoucher.selectedServiceIds.includes(id)) {
      updatedIds = editingVoucher.selectedServiceIds.filter(sid => sid !== id);
    } else {
      updatedIds = [...editingVoucher.selectedServiceIds, id];
    }

    const selectedServices = services.filter(s => updatedIds.includes(s.id));

    if (selectedServices.length > 0) {
      const names = selectedServices.map(s => s.name).join(', ');
      const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

      setEditingVoucher({
        ...editingVoucher,
        selectedServiceIds: updatedIds,
        name: names,
        value: totalPrice
      });
    } else {
      setEditingVoucher({
        ...editingVoucher,
        selectedServiceIds: updatedIds,
        name: '',
        value: 0
      });
    }
  };

  const handleUpdateVoucher = (e) => {
    e.preventDefault();
    saveVouchers(vouchers.map(v => v.id === editingVoucher.id ? {
      ...v,
      name: editingVoucher.name,
      type: editingVoucher.type,
      value: parseInt(editingVoucher.value)
    } : v));
    setEditingVoucher(null);
  };

  return (
    <div className="voucher-management-container">
      <div className="voucher-management-header">
        <div>
          <h1>Voucher Management</h1>
          <p>Create and manage your service vouchers</p>
        </div>
        <Link to="/provider/create-voucher" className="btn btn-primary">
          <Plus size={18} />
          Create Voucher
        </Link>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher Name</th>
                <th>Type</th>
                <th>Value</th>
                <th>Sold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td><strong>{voucher.name}</strong></td>
                  <td>{voucher.type}</td>
                  <td>₹{voucher.value}</td>
                  <td>{voucher.sold}</td>
                  <td>
                    {voucher.active ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons-inline">
                      <button 
                        className="btn-icon" 
                        title="View"
                        onClick={() => setViewingVoucher(voucher)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-icon" 
                        title="Edit"
                        onClick={() => handleEditVoucher(voucher)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon" 
                        title={voucher.active ? 'Deactivate' : 'Activate'}
                        onClick={() => toggleVoucherStatus(voucher.id)}
                      >
                        {voucher.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      </button>
                      <button 
                        className="btn-icon danger" 
                        title="Delete"
                        onClick={() => deleteVoucher(voucher.id)}
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
      {/* View Details Modal */}
      {viewingVoucher && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Voucher Details</h2>
              <button onClick={() => setViewingVoucher(null)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Voucher Name</strong>
                <div style={{ fontWeight: '600', fontSize: '1.1rem', marginTop: '0.25rem' }}>{viewingVoucher.name}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Voucher Type</strong>
                  <div style={{ marginTop: '0.25rem' }}>{viewingVoucher.type}</div>
                </div>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Voucher Value</strong>
                  <div style={{ marginTop: '0.25rem', fontWeight: '500' }}>₹{viewingVoucher.value}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Status</strong>
                  <div style={{ marginTop: '0.25rem' }}>
                    {viewingVoucher.active ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-danger">Inactive</span>
                    )}
                  </div>
                </div>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sold Count</strong>
                  <div style={{ marginTop: '0.25rem' }}>{viewingVoucher.sold} vouchers</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setViewingVoucher(null)} className="btn btn-primary">
                Close
              </button>
            </div>
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
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--border-color)' }}>
                  <label className="form-label" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Select Services to Include in Voucher (Choose Multiple)*</label>
                  {services.length === 0 ? (
                    <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.5rem', color: '#991b1b' }}>
                      No services found. Please go to the <strong>Services</strong> tab first and add services before editing a voucher.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', maxHeight: '160px', overflowY: 'auto' }}>
                      {services.map(s => (
                        <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', background: editingVoucher.selectedServiceIds?.includes(s.id) ? 'rgba(99, 102, 241, 0.1)' : '#f9fafb', borderRadius: '0.375rem', border: '1px solid', borderColor: editingVoucher.selectedServiceIds?.includes(s.id) ? 'var(--primary-color)' : '#e5e7eb', transition: 'all 0.2s' }}>
                          <input
                            type="checkbox"
                            checked={editingVoucher.selectedServiceIds?.includes(s.id) || false}
                            onChange={() => handleEditServiceToggle(s.id)}
                            style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '500' }}>₹{s.price}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                  <small style={{ color: '#6b7280', marginTop: '0.25rem', display: 'block' }}>
                    The Voucher Name and Value will dynamically sum and list all selected services.
                  </small>
                </div>

                <div className="form-group">
                  <label className="form-label">Voucher Name*</label>
                  <input
                    type="text"
                    className="form-input"
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
                    <option value="Service">Service</option>
                    <option value="Fixed Value">Fixed Value</option>
                    <option value="Promotional">Promotional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Value (₹)*</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingVoucher.value}
                    onChange={(e) => setEditingVoucher({ ...editingVoucher, value: e.target.value })}
                    required
                  />
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

export default VoucherManagement;
