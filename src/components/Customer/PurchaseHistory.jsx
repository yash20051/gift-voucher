import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import './Customer.css';

const PurchaseHistory = ({ user }) => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const purchases = [
    {
      id: 'ORD001',
      date: '2026-05-15',
      vouchers: [
        { name: 'Spa Relaxation Package', provider: 'Luxury Spa & Wellness', value: 2000, quantity: 1 }
      ],
      total: 2000,
      paymentMethod: 'Credit Card',
      status: 'completed'
    },
    {
      id: 'ORD002',
      date: '2026-05-10',
      vouchers: [
        { name: 'Gym Membership - 3 Months', provider: 'FitZone Gym', value: 3000, quantity: 1 },
        { name: 'Hair Styling Package', provider: 'Glamour Salon', value: 1500, quantity: 2 }
      ],
      total: 6000,
      paymentMethod: 'UPI',
      status: 'completed'
    },
    {
      id: 'ORD003',
      date: '2026-04-28',
      vouchers: [
        { name: 'Fine Dining Experience', provider: 'The Royal Kitchen', value: 5000, quantity: 1 }
      ],
      total: 5000,
      paymentMethod: 'Wallet',
      status: 'completed'
    },
    {
      id: 'ORD004',
      date: '2026-04-15',
      vouchers: [
        { name: 'Full Body Massage', provider: 'Serenity Spa', value: 2500, quantity: 2 }
      ],
      total: 5000,
      paymentMethod: 'Debit Card',
      status: 'completed'
    }
  ];

  const downloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div>
          <h1>Purchase History</h1>
          <p>View all your past transactions</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card">
        <div className="filter-row">
          <div className="date-filters">
            <div className="form-group">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-input"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-input"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-outline">
            <Filter size={18} />
            Apply Filter
          </button>
        </div>
      </div>

      {/* Purchase List */}
      <div className="purchase-list">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="purchase-card card">
            <div className="purchase-header">
              <div>
                <h3>Order #{purchase.id}</h3>
                <div className="purchase-meta">
                  <Calendar size={14} />
                  <span>{new Date(purchase.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
              <div className="purchase-actions">
                <span className="badge badge-success">{purchase.status}</span>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => downloadInvoice(purchase.id)}
                >
                  <Download size={16} />
                  Invoice
                </button>
              </div>
            </div>

            <div className="purchase-items">
              {purchase.vouchers.map((voucher, index) => (
                <div key={index} className="purchase-item">
                  <div className="item-details">
                    <h4>{voucher.name}</h4>
                    <p>{voucher.provider}</p>
                  </div>
                  <div className="item-pricing">
                    <span>Qty: {voucher.quantity}</span>
                    <span className="item-price">₹{voucher.value * voucher.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="purchase-footer">
              <div className="payment-info">
                <span>Payment: {purchase.paymentMethod}</span>
              </div>
              <div className="total-amount">
                <span>Total:</span>
                <span className="amount">₹{purchase.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {purchases.length === 0 && (
        <div className="no-results">
          <p>No purchase history available</p>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
