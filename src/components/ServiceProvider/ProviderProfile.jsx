import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Save } from 'lucide-react';
import './ServiceProvider.css';

const ProviderProfile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    businessName: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    pincode: user.pincode || '',
    category: user.category || 'spa',
    description: user.description || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const updatedUser = { ...user, ...formData, name: formData.businessName };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="provider-profile-container">
      <div className="provider-profile-header">
        <h1>Business Profile</h1>
        <p>Manage your business information</p>
      </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <Building size={16} />
              Business Name*
            </label>
            <input
              type="text"
              name="businessName"
              className="form-input"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email*
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={16} />
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Business Category*</label>
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

          <div className="form-group">
            <label className="form-label">Business Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your business..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} />
              Address*
            </label>
            <textarea
              name="address"
              className="form-textarea"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              required
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">City*</label>
              <input
                type="text"
                name="city"
                className="form-input"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">State*</label>
              <input
                type="text"
                name="state"
                className="form-input"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Pincode*</label>
            <input
              type="text"
              name="pincode"
              className="form-input"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProviderProfile;
