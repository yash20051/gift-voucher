import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Gift, ShoppingBag, TrendingUp, Clock, Star } from 'lucide-react';
import './Customer.css';

const CustomerDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    walletBalance: 5000,
    totalVouchers: 12,
    purchasedVouchers: 8,
    giftedVouchers: 4,
    redeemedVouchers: 5,
    expiringVouchers: 2
  });

  const [recentVouchers, setRecentVouchers] = useState([
    {
      id: 1,
      name: 'Spa Relaxation Package',
      provider: 'Luxury Spa & Wellness',
      value: 2000,
      expiryDate: '2026-08-15',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400'
    },
    {
      id: 2,
      name: 'Gym Membership - 3 Months',
      provider: 'FitZone Gym',
      value: 3000,
      expiryDate: '2026-09-20',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
    },
    {
      id: 3,
      name: 'Hair Styling Package',
      provider: 'Glamour Salon',
      value: 1500,
      expiryDate: '2026-07-10',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
    }
  ]);

  const [featuredOffers, setFeaturedOffers] = useState([
    {
      id: 101,
      name: 'Summer Special - Full Body Massage',
      provider: 'Serenity Spa',
      originalPrice: 3000,
      discountedPrice: 2100,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400'
    },
    {
      id: 102,
      name: 'Family Dining Package',
      provider: 'Taste of India',
      originalPrice: 4000,
      discountedPrice: 3200,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
    }
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user.name}!</h1>
          <p>Explore amazing vouchers and gift experiences to your loved ones</p>
        </div>
        <Link to="/customer/browse" className="btn btn-primary">
          <ShoppingBag size={18} />
          Browse Vouchers
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-icon">
            <Wallet size={32} />
          </div>
          <div className="stat-value">₹{stats.walletBalance.toLocaleString()}</div>
          <div className="stat-label">Wallet Balance</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <Gift size={32} />
          </div>
          <div className="stat-value">{stats.totalVouchers}</div>
          <div className="stat-label">Total Vouchers</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
          <div className="stat-value">{stats.purchasedVouchers}</div>
          <div className="stat-label">Purchased</div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          <div className="stat-icon">
            <Clock size={32} />
          </div>
          <div className="stat-value">{stats.expiringVouchers}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
      </div>

      {/* Recent Vouchers */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Vouchers</h2>
          <Link to="/customer/wallet" className="btn btn-outline">
            View All
          </Link>
        </div>
        <div className="voucher-grid">
          {recentVouchers.map((voucher) => (
            <div key={voucher.id} className="voucher-card">
              <div className="voucher-image">
                <img src={voucher.image} alt={voucher.name} />
                <span className="badge badge-success">Active</span>
              </div>
              <div className="voucher-content">
                <h3>{voucher.name}</h3>
                <p className="provider-name">{voucher.provider}</p>
                <div className="voucher-footer">
                  <span className="voucher-value">₹{voucher.value}</span>
                  <Link to={`/customer/voucher/${voucher.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Offers */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <Star size={20} style={{ color: '#f59e0b' }} />
            Featured Offers
          </h2>
        </div>
        <div className="offers-grid">
          {featuredOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image">
                <img src={offer.image} alt={offer.name} />
                <span className="discount-badge">{offer.discount}% OFF</span>
              </div>
              <div className="offer-content">
                <h3>{offer.name}</h3>
                <p className="provider-name">{offer.provider}</p>
                <div className="price-row">
                  <span className="original-price">₹{offer.originalPrice}</span>
                  <span className="discounted-price">₹{offer.discountedPrice}</span>
                </div>
                <Link to={`/customer/voucher/${offer.id}`} className="btn btn-primary btn-block btn-sm">
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/customer/browse" className="action-card">
          <ShoppingBag size={32} />
          <span>Browse Vouchers</span>
        </Link>
        <Link to="/customer/wallet" className="action-card">
          <Wallet size={32} />
          <span>My Wallet</span>
        </Link>
        <Link to="/customer/history" className="action-card">
          <Clock size={32} />
          <span>Purchase History</span>
        </Link>
        <Link to="/customer/support" className="action-card">
          <Gift size={32} />
          <span>Get Support</span>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
