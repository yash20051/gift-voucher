import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import './ServiceProvider.css';

const CreateVoucher = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'fixed-value',
    value: '',
    description: '',
    longDescription: '',
    category: 'spa',
    validityDays: '180',
    termsConditions: '',
    features: '',
    discount: '0'
  });

  const [services, setServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices([]);
      localStorage.setItem('services', JSON.stringify([]));
    }
  }, []);

  const handleServiceToggle = (id) => {
    let updatedIds;
    if (selectedServiceIds.includes(id)) {
      updatedIds = selectedServiceIds.filter(sid => sid !== id);
    } else {
      updatedIds = [...selectedServiceIds, id];
    }
    setSelectedServiceIds(updatedIds);

    const selectedServices = services.filter(s => updatedIds.includes(s.id));

    if (selectedServices.length > 0) {
      const names = selectedServices.map(s => s.name).join(', ');
      const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
      const category = selectedServices[0].category;
      const desc = `Includes services: ${selectedServices.map(s => s.name).join(', ')}`;

      setFormData({
        ...formData,
        name: names,
        value: totalPrice.toString(),
        category: category,
        description: desc
      });
    } else {
      setFormData({
        ...formData,
        name: '',
        value: '',
        category: 'spa',
        description: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const stored = localStorage.getItem('provider_vouchers');
    const vouchersList = stored ? JSON.parse(stored) : [];

    const typeMapping = {
      'fixed-value': 'Fixed Value',
      'service': 'Service',
      'promotional': 'Promotional'
    };

    const categoryImages = {
      'spa': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      'salon': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      'gym': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      'restaurant': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      'experience': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400'
    };

    const newVoucherObj = {
      id: vouchersList.length > 0 ? Math.max(...vouchersList.map(v => v.id)) + 1 : 1,
      name: formData.name,
      type: typeMapping[formData.type] || formData.type,
      value: parseInt(formData.value) || 0,
      sold: 0,
      active: true,
      validityDays: parseInt(formData.validityDays) || 180,
      provider: user.name || 'Service Provider',
      category: formData.category || 'spa',
      description: formData.description || '',
      rating: 5.0,
      reviews: 0,
      image: categoryImages[formData.category] || categoryImages['spa'],
      discount: parseInt(formData.discount) || 0
    };

    const updatedVouchers = [newVoucherObj, ...vouchersList];
    localStorage.setItem('provider_vouchers', JSON.stringify(updatedVouchers));

    alert('Voucher created successfully!');
    navigate('/provider/vouchers');
  };

  return (
    <div className="create-voucher-container">
      <div className="create-voucher-header">
        <button onClick={() => navigate('/provider/vouchers')} className="btn btn-outline">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1>Create New Voucher</h1>
      </div>

      <form onSubmit={handleSubmit} className="voucher-form card">
        <div className="form-group" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border-color)' }}>
          <label className="form-label" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Select Services to Include in Voucher (Choose Multiple)*</label>
          {services.length === 0 ? (
            <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.5rem', color: '#991b1b' }}>
              No services found. Please go to the <strong>Services</strong> tab first and add services before creating a voucher.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {services.map(s => (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', background: selectedServiceIds.includes(s.id) ? 'rgba(99, 102, 241, 0.1)' : '#f9fafb', borderRadius: '0.5rem', border: '1px solid', borderColor: selectedServiceIds.includes(s.id) ? 'var(--primary-color)' : '#e5e7eb', transition: 'all 0.2s' }}>
                  <input
                    type="checkbox"
                    checked={selectedServiceIds.includes(s.id)}
                    onChange={() => handleServiceToggle(s.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: '500', marginTop: '0.15rem' }}>₹{s.price}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
          <small style={{ color: '#6b7280', marginTop: '0.5rem', display: 'block' }}>
            The Voucher Name and Value will dynamically sum and list all selected services.
          </small>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Voucher Name*</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g., Spa Relaxation Package"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Voucher Type*</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="fixed-value">Fixed Value</option>
              <option value="service">Service Voucher</option>
              <option value="promotional">Promotional</option>
            </select>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Voucher Value (₹)*</label>
            <input
              type="number"
              name="value"
              className="form-input"
              placeholder="Enter amount"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category*</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="spa">Spa & Wellness</option>
              <option value="salon">Salon & Beauty</option>
              <option value="gym">Gym & Fitness</option>
              <option value="restaurant">Restaurant</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="form-input"
            placeholder="Optional discount percentage"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Short Description*</label>
          <input
            type="text"
            name="description"
            className="form-input"
            placeholder="Brief one-line description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Description*</label>
          <textarea
            name="longDescription"
            className="form-textarea"
            placeholder="Provide detailed information about the voucher"
            value={formData.longDescription}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Features Included</label>
          <textarea
            name="features"
            className="form-textarea"
            placeholder="Enter each feature on a new line"
            value={formData.features}
            onChange={handleChange}
            rows="4"
          />
          <small>Enter one feature per line</small>
        </div>

        <div className="form-group">
          <label className="form-label">Terms & Conditions*</label>
          <textarea
            name="termsConditions"
            className="form-textarea"
            placeholder="Enter terms and conditions (one per line)"
            value={formData.termsConditions}
            onChange={handleChange}
            rows="5"
            required
          />
          <small>Enter one term per line</small>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/provider/vouchers')} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={18} />
            Create Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVoucher;
