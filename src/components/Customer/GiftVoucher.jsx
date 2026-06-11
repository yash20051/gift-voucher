import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Mail, Phone, Calendar, MessageSquare, Image, Video, Send } from 'lucide-react';
import './Customer.css';

const GiftVoucher = ({ user }) => {
  const { voucherId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    deliveryDate: '',
    message: '',
    mediaType: 'text'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock voucher data
  const voucher = {
    id: voucherId,
    name: 'Spa Relaxation Package',
    provider: 'Luxury Spa & Wellness',
    value: 2000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending gift
    setTimeout(() => {
      alert(`Gift voucher sent successfully to ${formData.recipientName}!`);
      setLoading(false);
      navigate('/customer/wallet');
    }, 2000);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="gift-voucher-container">
      <div className="gift-header">
        <Gift size={32} />
        <h1>Gift this Voucher</h1>
        <p>Share the joy with your loved ones</p>
      </div>

      <div className="gift-grid">
        {/* Voucher Preview */}
        <div className="gift-preview card">
          <h2>Voucher Details</h2>
          <div className="preview-voucher">
            <img src={voucher.image} alt={voucher.name} />
            <div className="preview-content">
              <h3>{voucher.name}</h3>
              <p className="provider-name">{voucher.provider}</p>
              <div className="preview-value">₹{voucher.value}</div>
            </div>
          </div>
        </div>

        {/* Gift Form */}
        <div className="gift-form card">
          <h2>Recipient Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Recipient's Name
              </label>
              <input
                type="text"
                name="recipientName"
                className="form-input"
                placeholder="Enter recipient's full name"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Recipient's Email
              </label>
              <input
                type="email"
                name="recipientEmail"
                className="form-input"
                placeholder="Enter recipient's email"
                value={formData.recipientEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={16} />
                Recipient's Phone
              </label>
              <input
                type="tel"
                name="recipientPhone"
                className="form-input"
                placeholder="Enter recipient's phone number"
                value={formData.recipientPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} />
                Delivery Date
              </label>
              <input
                type="date"
                name="deliveryDate"
                className="form-input"
                min={getTodayDate()}
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
              <small>Select when you want the gift to be delivered</small>
            </div>

            <div className="form-group">
              <label className="form-label">Gift Message Type</label>
              <div className="media-type-selector">
                <button
                  type="button"
                  className={`media-btn ${formData.mediaType === 'text' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, mediaType: 'text' })}
                >
                  <MessageSquare size={20} />
                  Text Message
                </button>
                <button
                  type="button"
                  className={`media-btn ${formData.mediaType === 'image' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, mediaType: 'image' })}
                >
                  <Image size={20} />
                  Image
                </button>
                <button
                  type="button"
                  className={`media-btn ${formData.mediaType === 'video' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, mediaType: 'video' })}
                >
                  <Video size={20} />
                  Video
                </button>
              </div>
            </div>

            {formData.mediaType === 'text' && (
              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={16} />
                  Personal Message
                </label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Write a heartfelt message for your loved one..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
                <small>{formData.message.length}/500 characters</small>
              </div>
            )}

            {(formData.mediaType === 'image' || formData.mediaType === 'video') && (
              <div className="form-group">
                <label className="form-label">
                  {formData.mediaType === 'image' ? <Image size={16} /> : <Video size={16} />}
                  Upload {formData.mediaType === 'image' ? 'Image' : 'Video'}
                </label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="mediaFile"
                    accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                    onChange={handleFileSelect}
                    required
                  />
                  <label htmlFor="mediaFile" className="file-upload-label">
                    {selectedFile ? (
                      <span>{selectedFile.name}</span>
                    ) : (
                      <span>Click to upload {formData.mediaType}</span>
                    )}
                  </label>
                </div>
                {selectedFile && (
                  <div className="file-preview">
                    <p>Selected: {selectedFile.name}</p>
                  </div>
                )}
              </div>
            )}

            <div className="gift-summary">
              <h3>Gift Summary</h3>
              <div className="summary-row">
                <span>Voucher Value:</span>
                <span>₹{voucher.value}</span>
              </div>
              <div className="summary-row">
                <span>Processing Fee:</span>
                <span>₹0</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{voucher.value}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              <Send size={18} />
              {loading ? 'Sending Gift...' : 'Send Gift Voucher'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftVoucher;
