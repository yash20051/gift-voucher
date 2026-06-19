import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import './Customer.css';

const BrowseVouchers = ({ user }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'spa', name: 'Spa & Wellness' },
    { id: 'salon', name: 'Salon & Beauty' },
    { id: 'gym', name: 'Gym & Fitness' },
    { id: 'restaurant', name: 'Restaurants' },
    { id: 'experience', name: 'Experiences' }
  ];

  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const storedVouchers = localStorage.getItem('provider_vouchers');
    if (storedVouchers) {
      const allVouchers = JSON.parse(storedVouchers);
      setVouchers(allVouchers.filter(v => v.active === true || v.status === 'active'));
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
      setVouchers(defaultList.filter(v => v.active === true || v.status === 'active'));
    }
  }, []);

  useEffect(() => {
    if (location.state?.searchQuery !== undefined) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch = voucher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         voucher.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || voucher.category === selectedCategory;
    const matchesPrice = voucher.value >= priceRange.min && voucher.value <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1>Browse Vouchers</h1>
        <p>Discover amazing deals from top service providers</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search vouchers or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-btn">
              <X size={18} />
            </button>
          )}
        </div>
        <button 
          className="btn btn-outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel card">
          <div className="filter-section">
            <h3>Category</h3>
            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className="form-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredVouchers.length} voucher{filteredVouchers.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Vouchers Grid */}
      <div className="vouchers-grid">
        {filteredVouchers.map((voucher) => (
          <div key={voucher.id} className="voucher-item">
            <div className="voucher-item-image">
              <img src={voucher.image} alt={voucher.name} />
              {voucher.discount > 0 && (
                <span className="discount-badge">{voucher.discount}% OFF</span>
              )}
            </div>
            <div className="voucher-item-content">
              <h3>{voucher.name}</h3>
              <p className="provider-name">{voucher.provider}</p>
              <p className="description">{voucher.description}</p>
              <div className="rating">
                <span className="rating-value">★ {voucher.rating}</span>
                <span className="rating-count">({voucher.reviews} reviews)</span>
              </div>
              <div className="voucher-item-footer">
                <div className="price-info">
                  {voucher.discount > 0 ? (
                    <>
                      <span className="original-price">₹{voucher.value}</span>
                      <span className="discounted-price">
                        ₹{Math.round(voucher.value * (1 - voucher.discount / 100))}
                      </span>
                    </>
                  ) : (
                    <span className="price">₹{voucher.value}</span>
                  )}
                </div>
                <Link to={`/customer/voucher/${voucher.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVouchers.length === 0 && (
        <div className="no-results">
          <p>No vouchers found matching your criteria</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPriceRange({ min: 0, max: 10000 });
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseVouchers;
