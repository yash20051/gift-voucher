import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Gift, ShoppingCart, Info } from 'lucide-react';
import './Customer.css';

const VoucherDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock voucher data
  const voucher = {
    id: id,
    name: 'Spa Relaxation Package',
    provider: 'Luxury Spa & Wellness',
    category: 'Spa & Wellness',
    value: 2000,
    description: 'Indulge in a full-body relaxation experience with our premium spa package. Includes steam bath, body massage, facial treatment, and aromatherapy.',
    longDescription: 'Experience ultimate relaxation with our comprehensive spa package designed to rejuvenate your body and mind. Our expert therapists use premium organic products and traditional techniques to provide you with an unforgettable wellness experience.',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    discount: 15,
    expiryDays: 180,
    termsConditions: [
      'Valid for 6 months from date of purchase',
      'Prior appointment required',
      'Cannot be combined with other offers',
      'Non-refundable and non-transferable',
      'Applicable on weekdays only'
    ],
    features: [
      'Full Body Massage (60 mins)',
      'Steam Bath',
      'Facial Treatment',
      'Aromatherapy Session',
      'Complimentary Refreshments'
    ],
    location: 'Bandra West, Mumbai',
    openingHours: 'Mon-Sat: 10:00 AM - 8:00 PM'
  };

  const finalPrice = Math.round(voucher.value * (1 - voucher.discount / 100));

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    // Simulate purchase
    alert(`Successfully purchased ${quantity} voucher(s) for ₹${finalPrice * quantity}`);
    setShowPurchaseModal(false);
    navigate('/customer/wallet');
  };

  return (
    <div className="voucher-details-container">
      <div className="details-grid">
        {/* Left Column - Image and Gallery */}
        <div className="details-images">
          <div className="main-image">
            <img src={voucher.image} alt={voucher.name} />
            {voucher.discount > 0 && (
              <span className="discount-badge-large">{voucher.discount}% OFF</span>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="details-content">
          <div className="breadcrumb">
            <Link to="/customer/browse">Browse</Link> / <span>{voucher.name}</span>
          </div>

          <h1>{voucher.name}</h1>
          <div className="provider-info">
            <h3>{voucher.provider}</h3>
            <div className="rating-large">
              <Star size={20} fill="#f59e0b" color="#f59e0b" />
              <span>{voucher.rating}</span>
              <span className="reviews">({voucher.reviews} reviews)</span>
            </div>
          </div>

          <div className="price-section">
            {voucher.discount > 0 && (
              <span className="original-price-large">₹{voucher.value}</span>
            )}
            <span className="current-price">₹{finalPrice}</span>
            {voucher.discount > 0 && (
              <span className="savings">You save ₹{voucher.value - finalPrice}</span>
            )}
          </div>

          <div className="info-badges">
            <div className="info-badge">
              <MapPin size={18} />
              <span>{voucher.location}</span>
            </div>
            <div className="info-badge">
              <Clock size={18} />
              <span>Valid for {voucher.expiryDays} days</span>
            </div>
          </div>

          <div className="description-section">
            <h2>About this Voucher</h2>
            <p>{voucher.longDescription}</p>
          </div>

          <div className="features-section">
            <h2>What's Included</h2>
            <ul>
              {voucher.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="action-buttons">
            <button onClick={handlePurchase} className="btn btn-primary btn-large">
              <ShoppingCart size={20} />
              Purchase Now
            </button>
            <Link 
              to={`/customer/gift/${voucher.id}`} 
              className="btn btn-secondary btn-large"
            >
              <Gift size={20} />
              Gift this Voucher
            </Link>
          </div>

          <div className="terms-section">
            <h2>
              <Info size={20} />
              Terms & Conditions
            </h2>
            <ul>
              {voucher.termsConditions.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Purchase Voucher</h2>
              <button onClick={() => setShowPurchaseModal(false)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="purchase-summary">
                <h3>{voucher.name}</h3>
                <p className="provider-name">{voucher.provider}</p>
                
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Price per voucher:</span>
                    <span>₹{finalPrice}</span>
                  </div>
                  <div className="price-row">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Amount:</span>
                    <span>₹{finalPrice * quantity}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowPurchaseModal(false)} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={confirmPurchase} className="btn btn-primary">
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherDetails;
