import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet as WalletIcon, Gift, QrCode, Clock, CheckCircle, XCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './Customer.css';

const Wallet = ({ user }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const vouchers = [
    {
      id: 'V001',
      name: 'Spa Relaxation Package',
      provider: 'Luxury Spa & Wellness',
      value: 2000,
      purchaseDate: '2026-05-15',
      expiryDate: '2026-08-15',
      status: 'active',
      type: 'purchased',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400'
    },
    {
      id: 'V002',
      name: 'Gym Membership - 3 Months',
      provider: 'FitZone Gym',
      value: 3000,
      purchaseDate: '2026-04-20',
      expiryDate: '2026-09-20',
      status: 'active',
      type: 'received',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      giftedBy: 'Sarah Johnson'
    },
    {
      id: 'V003',
      name: 'Hair Styling Package',
      provider: 'Glamour Salon',
      value: 1500,
      purchaseDate: '2026-03-10',
      expiryDate: '2026-06-10',
      status: 'active',
      type: 'purchased',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
    },
    {
      id: 'V004',
      name: 'Fine Dining Experience',
      provider: 'The Royal Kitchen',
      value: 5000,
      purchaseDate: '2026-02-05',
      redemptionDate: '2026-05-20',
      status: 'redeemed',
      type: 'purchased',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
    },
    {
      id: 'V005',
      name: 'Massage Therapy',
      provider: 'Wellness Center',
      value: 1800,
      purchaseDate: '2025-12-01',
      expiryDate: '2026-01-01',
      status: 'expired',
      type: 'gifted',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400',
      giftedTo: 'Mom'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Vouchers', count: vouchers.length },
    { id: 'active', label: 'Active', count: vouchers.filter(v => v.status === 'active').length },
    { id: 'redeemed', label: 'Redeemed', count: vouchers.filter(v => v.status === 'redeemed').length },
    { id: 'expired', label: 'Expired', count: vouchers.filter(v => v.status === 'expired').length }
  ];

  const filteredVouchers = activeTab === 'all' 
    ? vouchers 
    : vouchers.filter(v => v.status === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} color="#10b981" />;
      case 'redeemed': return <CheckCircle size={16} color="#6b7280" />;
      case 'expired': return <XCircle size={16} color="#ef4444" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'active' ? 'badge-success' : 
                       status === 'redeemed' ? 'badge-primary' : 'badge-danger';
    return <span className={`badge ${badgeClass}`}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <div>
          <h1>My Wallet</h1>
          <p>Manage all your vouchers in one place</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Vouchers List */}
      <div className="vouchers-list">
        {filteredVouchers.map((voucher) => (
          <div key={voucher.id} className="wallet-voucher-card">
            <div className="wallet-voucher-image">
              <img src={voucher.image} alt={voucher.name} />
            </div>
            <div className="wallet-voucher-content">
              <div className="wallet-voucher-header">
                <h3>{voucher.name}</h3>
                {getStatusBadge(voucher.status)}
              </div>
              <p className="provider-name">{voucher.provider}</p>
              <div className="voucher-meta">
                <span className="voucher-id">ID: {voucher.id}</span>
                <span className="voucher-value">₹{voucher.value}</span>
              </div>
              <div className="voucher-dates">
                <div>
                  <Clock size={14} />
                  <span>
                    {voucher.status === 'redeemed' 
                      ? `Redeemed on ${voucher.redemptionDate}`
                      : voucher.status === 'expired'
                      ? `Expired on ${voucher.expiryDate}`
                      : `Expires on ${voucher.expiryDate}`}
                  </span>
                </div>
              </div>
              {voucher.type === 'received' && voucher.giftedBy && (
                <div className="gift-info">
                  <Gift size={14} />
                  <span>Gift from {voucher.giftedBy}</span>
                </div>
              )}
              {voucher.type === 'gifted' && voucher.giftedTo && (
                <div className="gift-info">
                  <Gift size={14} />
                  <span>Gifted to {voucher.giftedTo}</span>
                </div>
              )}
            </div>
            <div className="wallet-voucher-actions">
              {voucher.status === 'active' && (
                <>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedVoucher(voucher)}
                  >
                    <QrCode size={16} />
                    Show QR
                  </button>
                  <Link to={`/customer/gift/${voucher.id}`} className="btn btn-outline btn-sm">
                    <Gift size={16} />
                    Gift
                  </Link>
                </>
              )}
              {voucher.status === 'expired' && (
                <button className="btn btn-outline btn-sm" disabled>
                  Expired
                </button>
              )}
              {voucher.status === 'redeemed' && (
                <span className="redeemed-label">
                  <CheckCircle size={16} />
                  Redeemed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVouchers.length === 0 && (
        <div className="no-results">
          <p>No vouchers in this category</p>
          <Link to="/customer/browse" className="btn btn-primary">
            Browse Vouchers
          </Link>
        </div>
      )}

      {/* QR Code Modal */}
      {selectedVoucher && (
        <div className="modal-overlay" onClick={() => setSelectedVoucher(null)}>
          <div className="modal qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Voucher QR Code</h2>
              <button onClick={() => setSelectedVoucher(null)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body qr-modal-body">
              <div className="qr-voucher-details">
                <h3>{selectedVoucher.name}</h3>
                <p className="provider-name">{selectedVoucher.provider}</p>
                <div className="qr-value">₹{selectedVoucher.value}</div>
              </div>
              <div className="qr-code-container">
                <QRCodeSVG 
                  value={`VOUCHER-${selectedVoucher.id}`} 
                  size={256}
                  level="H"
                />
              </div>
              <div className="qr-instructions">
                <p>Show this QR code at the service provider to redeem your voucher</p>
                <p className="voucher-id-display">Voucher ID: {selectedVoucher.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
