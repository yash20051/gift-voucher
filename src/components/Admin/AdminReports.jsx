import React, { useState } from 'react';
import { Download, Calendar, TrendingUp } from 'lucide-react';
import './Admin.css';

const AdminReports = ({ user }) => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const monthlyRevenue = [
    { month: 'Jan', revenue: 285000, commission: 28500 },
    { month: 'Feb', revenue: 340000, commission: 34000 },
    { month: 'Mar', revenue: 420000, commission: 42000 },
    { month: 'Apr', revenue: 510000, commission: 51000 },
    { month: 'May', revenue: 680000, commission: 68000 },
    { month: 'Jun', revenue: 615000, commission: 61500 }
  ];

  const topProviders = [
    { name: 'Luxury Spa & Wellness', sales: 145, revenue: 290000 },
    { name: 'FitZone Gym', sales: 98, revenue: 245000 },
    { name: 'Glamour Salon', sales: 87, revenue: 195000 }
  ];

  const downloadReport = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="admin-reports-container">
      <div className="admin-reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Platform performance and insights</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-value">₹3.65M</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change positive">+15% from last month</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">₹365K</div>
          <div className="stat-label">Commission Earned</div>
          <div className="stat-change positive">+18% from last month</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">1,245</div>
          <div className="stat-label">Total Transactions</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="stat-value">892</div>
          <div className="stat-label">Redemptions</div>
          <div className="stat-change">71.6% redemption rate</div>
        </div>
      </div>

      {/* Download Reports */}
      <div className="card">
        <div className="report-actions">
          <div className="date-filter">
            <Calendar size={18} />
            <input
              type="date"
              className="form-input"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
            <span>to</span>
            <input
              type="date"
              className="form-input"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
          </div>
          <div className="download-buttons">
            <button onClick={() => downloadReport('revenue')} className="btn btn-outline">
              <Download size={18} />
              Revenue Report
            </button>
            <button onClick={() => downloadReport('commission')} className="btn btn-outline">
              <Download size={18} />
              Commission Report
            </button>
            <button onClick={() => downloadReport('transactions')} className="btn btn-outline">
              <Download size={18} />
              Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <TrendingUp size={20} />
            Monthly Revenue (Last 6 Months)
          </h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Revenue</th>
                <th>Platform Commission</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map((data) => (
                <tr key={data.month}>
                  <td><strong>{data.month}</strong></td>
                  <td>₹{data.revenue.toLocaleString()}</td>
                  <td>₹{data.commission.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Providers */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Top Performing Service Providers</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Provider Name</th>
                <th>Sales</th>
                <th>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {topProviders.map((provider, index) => (
                <tr key={index}>
                  <td><strong>{provider.name}</strong></td>
                  <td>{provider.sales}</td>
                  <td>₹{provider.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
