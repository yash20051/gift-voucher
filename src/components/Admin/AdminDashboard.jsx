import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building, Gift, DollarSign, TrendingUp } from 'lucide-react';
import './Admin.css';

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalCustomers: 1245,
    totalProviders: 156,
    totalVouchers: 489,
    totalRevenue: 3650000,
    platformCommission: 365000,
    activeVouchers: 312,
    redeemedVouchers: 892,
    pendingProviders: 8
  });

  const recentActivities = [
    { id: 1, type: 'provider', action: 'New provider registered', name: 'Wellness Spa', time: '2 hours ago' },
    { id: 2, type: 'voucher', action: 'Voucher created', name: 'Summer Special - Beauty Salon', time: '5 hours ago' },
    { id: 3, type: 'customer', action: 'New customer registered', name: 'John Doe', time: '1 day ago' },
    { id: 4, type: 'sale', action: 'Voucher purchased', name: 'Spa Package - ₹2000', time: '1 day ago' }
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Platform overview and management</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4">
        <Link to="/admin/customers" className="stat-card stat-card-link">
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <div className="stat-value">{stats.totalCustomers.toLocaleString()}</div>
          <div className="stat-label">Total Customers</div>
          <div className="stat-trend">↑ 12% from last month</div>
        </Link>

        <Link to="/admin/providers" className="stat-card secondary stat-card-link">
          <div className="stat-icon">
            <Building size={32} />
          </div>
          <div className="stat-value">{stats.totalProviders}</div>
          <div className="stat-label">Service Providers</div>
          {stats.pendingProviders > 0 && (
            <div className="stat-badge">{stats.pendingProviders} pending approval</div>
          )}
        </Link>

        <Link to="/admin/vouchers" className="stat-card warning stat-card-link">
          <div className="stat-icon">
            <Gift size={32} />
          </div>
          <div className="stat-value">{stats.totalVouchers}</div>
          <div className="stat-label">Total Vouchers</div>
          <div className="stat-trend">↑ 8% from last month</div>
        </Link>

        <Link to="/admin/reports" className="stat-card stat-card-link" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-value">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
          <div className="stat-label">Platform Revenue</div>
          <div className="stat-trend">↑ 15% from last month</div>
        </Link>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-3">
        <div className="card stat-detail">
          <div className="stat-detail-header">
            <span>Active Vouchers</span>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div className="stat-detail-value">{stats.activeVouchers}</div>
        </div>

        <div className="card stat-detail">
          <div className="stat-detail-header">
            <span>Redeemed</span>
            <TrendingUp size={20} color="#6366f1" />
          </div>
          <div className="stat-detail-value">{stats.redeemedVouchers}</div>
        </div>

        <div className="card stat-detail">
          <div className="stat-detail-header">
            <span>Commission Earned</span>
            <TrendingUp size={20} color="#f59e0b" />
          </div>
          <div className="stat-detail-value">₹{(stats.platformCommission / 100000).toFixed(1)}L</div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Activities</h2>
        </div>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'provider' && <Building size={20} />}
                {activity.type === 'customer' && <Users size={20} />}
                {activity.type === 'voucher' && <Gift size={20} />}
                {activity.type === 'sale' && <DollarSign size={20} />}
              </div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-name">{activity.name}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/admin/providers" className="admin-action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              <Building size={32} />
            </div>
            <div className="action-card-content">
              <h3>Manage Providers</h3>
              <p>Add, approve, and manage service providers</p>
            </div>
          </Link>
          <Link to="/admin/customers" className="admin-action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <Users size={32} />
            </div>
            <div className="action-card-content">
              <h3>Manage Customers</h3>
              <p>View and manage customer accounts</p>
            </div>
          </Link>
          <Link to="/admin/vouchers" className="admin-action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <Gift size={32} />
            </div>
            <div className="action-card-content">
              <h3>Manage Vouchers</h3>
              <p>Create and manage platform vouchers</p>
            </div>
          </Link>
          <Link to="/admin/support" className="admin-action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <TrendingUp size={32} />
            </div>
            <div className="action-card-content">
              <h3>Support Dashboard</h3>
              <p>Manage tickets and customer support</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
