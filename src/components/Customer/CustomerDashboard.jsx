import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Gift, ShoppingBag, TrendingUp, Clock, Star, Search, X } from 'lucide-react';
import './Customer.css';

const CustomerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allVouchers, setAllVouchers] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedVouchers = localStorage.getItem('provider_vouchers');
    if (storedVouchers) {
      const parsed = JSON.parse(storedVouchers);
      setAllVouchers(parsed.filter(v => v.active === true || v.status === 'active'));
    } else {
      const defaultList = [
        {
          id: 1,
          name: 'Spa Relaxation Package',
          provider: 'Luxury Spa & Wellness',
          category: 'spa',
          type: 'Service',
          value: 2000,
          sold: 45,
          active: true,
          validityDays: 180,
          description: 'Indulge in a full-body relaxation experience',
          rating: 4.8,
          reviews: 156,
          image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
          discount: 15
        },
        {
          id: 2,
          name: 'Gym Membership - 3 Months',
          provider: 'FitZone Gym',
          category: 'gym',
          type: 'Service',
          value: 3000,
          sold: 38,
          active: true,
          validityDays: 180,
          description: 'Complete gym access with trainer support',
          rating: 4.5,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
          discount: 20
        },
        {
          id: 3,
          name: 'Hair Styling Package',
          provider: 'Glamour Salon',
          category: 'salon',
          type: 'Service',
          value: 1500,
          sold: 62,
          active: true,
          validityDays: 90,
          description: 'Professional hair styling and treatment',
          rating: 4.9,
          reviews: 234,
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          discount: 10
        },
        {
          id: 4,
          name: 'Fine Dining Experience',
          provider: 'The Royal Kitchen',
          category: 'restaurant',
          type: 'Promotional',
          value: 5000,
          sold: 12,
          active: true,
          validityDays: 120,
          description: 'Multi-course gourmet dining for 2',
          rating: 4.7,
          reviews: 178,
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
          discount: 25
        },
        {
          id: 5,
          name: 'Full Body Massage',
          provider: 'Luxury Spa & Wellness',
          category: 'spa',
          type: 'Service',
          value: 2500,
          sold: 0,
          active: true,
          validityDays: 180,
          description: 'Therapeutic massage for complete relaxation',
          rating: 4.6,
          reviews: 142,
          image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400',
          discount: 30
        },
        {
          id: 6,
          name: 'Bridal Makeup Package',
          provider: 'Beauty Studio Pro',
          category: 'salon',
          type: 'Service',
          value: 8000,
          sold: 0,
          active: false,
          validityDays: 90,
          description: 'Complete bridal makeup and hairstyling',
          rating: 5.0,
          reviews: 67,
          image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
          discount: 0
        }
      ];
      localStorage.setItem('provider_vouchers', JSON.stringify(defaultList));
      setAllVouchers(defaultList.filter(v => v.active === true || v.status === 'active'));
    }
  }, []);

  const suggestions = searchQuery.trim() === ''
    ? []
    : allVouchers.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.provider.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/customer/browse', { state: { searchQuery: searchQuery.trim() } });
    }
  };

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
      {/* Hero Section with Search */}
      <div className="dashboard-hero">
        <h1>Welcome back, {user.name}!</h1>
        <p>Explore premium vouchers and curate unforgettable experiences for your loved ones</p>
        
        <div className="dashboard-search-container" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="dashboard-search-bar">
            <div className="dashboard-search-input-wrapper">
              <Search size={20} />
              <input
                type="text"
                className="dashboard-search-input"
                placeholder="Search vouchers or service providers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="dashboard-search-clear"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="dashboard-search-btn">
              Search
            </button>
          </form>

          {/* Autocomplete Dropdown suggestions */}
          {showSuggestions && searchQuery.trim().length > 0 && (
            <div className="search-suggestions-dropdown">
              <div className="suggestions-header">
                <span>Matching Vouchers</span>
              </div>
              
              {suggestions.length > 0 ? (
                <>
                  {suggestions.slice(0, 4).map((voucher) => (
                    <Link
                      key={voucher.id}
                      to={`/customer/voucher/${voucher.id}`}
                      className="suggestion-item"
                    >
                      <img src={voucher.image} alt={voucher.name} className="suggestion-img" />
                      <div className="suggestion-info">
                        <div className="suggestion-name">{voucher.name}</div>
                        <div className="suggestion-provider">{voucher.provider}</div>
                      </div>
                      <div className="suggestion-meta">
                        <div className="suggestion-price">₹{voucher.value}</div>
                        <span className="suggestion-category">
                          {voucher.category.charAt(0).toUpperCase() + voucher.category.slice(1)}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/customer/browse"
                    state={{ searchQuery }}
                    className="suggestions-all-results"
                  >
                    View all {suggestions.length} results
                  </Link>
                </>
              ) : (
                <div className="no-suggestions">
                  <Search size={24} />
                  <span>No vouchers or providers found</span>
                  <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.7 }}>
                    Try searching with another keyword
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
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
