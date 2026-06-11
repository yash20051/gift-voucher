import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Gift, TrendingUp, Users, Plus } from 'lucide-react';
import './ServiceProvider.css';

const ProviderDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalRevenue: 125000,
    activeVouchers: 15,
    soldVouchers: 234,
    redeemedVouchers: 189,
    pendingRedemptions: 8
  });

  const [recentSales, setRecentSales] = useState([
    { id: 1, voucher: 'Spa Relaxation Package', amount: 2000, date: '2026-06-10', customer: 'John Doe' },
    { id: 2, voucher: 'Full Body Massage', amount: 2500, date: '2026-06-09', customer: 'Jane Smith' },
    { id: 3, voucher: 'Hair Styling Package', amount: 1500, date: '2026-06-08', customer: 'Mike Johnson' }
  ]);

  return (
    <div className="provider-dashboard-container">
      <div className="provider-dashboard-header">
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Manage your vouchers and track your business performance</p>
        </div>
        <Link to="/provider/create-voucher" className="btn btn-primary">
          <Plus size={18} />
          Create Voucher
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <Gift size={32} />
          </div>
          <div className="stat-value">{stats.activeVouchers}</div>
          <div className="stat-label">Active Vouchers</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
          <div className="stat-value">{stats.soldVouchers}</div>
          <div className="stat-label">Vouchers Sold</div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <div className="stat-value">{stats.redeemedVouchers}</div>
          <div className="stat-label">Redeemed</div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Sales</h2>
          <Link to="/provider/reports" className="btn btn-outline">
            View All
          </Link>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.voucher}</td>
                  <td>{sale.customer}</td>
                  <td>₹{sale.amount}</td>
                  <td>{new Date(sale.date).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/provider/vouchers" className="action-card">
          <Gift size={32} />
          <span>Manage Vouchers</span>
        </Link>
        <Link to="/provider/redemptions" className="action-card">
          <Users size={32} />
          <span>Redemptions</span>
        </Link>
        <Link to="/provider/reports" className="action-card">
          <TrendingUp size={32} />
          <span>Reports</span>
        </Link>
        <Link to="/provider/support" className="action-card">
          <Plus size={32} />
          <span>Get Support</span>
        </Link>
      </div>
    </div>
  );
};

export default ProviderDashboard;
