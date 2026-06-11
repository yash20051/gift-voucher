import React, { useState } from 'react';
import { Download, Calendar, TrendingUp } from 'lucide-react';
import './ServiceProvider.css';

const ProviderReports = ({ user }) => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const salesData = [
    { month: 'Jan', sales: 15, revenue: 35000 },
    { month: 'Feb', sales: 22, revenue: 48000 },
    { month: 'Mar', sales: 28, revenue: 62000 },
    { month: 'Apr', sales: 35, revenue: 78000 },
    { month: 'May', sales: 42, revenue: 95000 },
    { month: 'Jun', sales: 38, revenue: 85000 }
  ];

  const topVouchers = [
    { name: 'Spa Relaxation Package', sold: 45, revenue: 90000 },
    { name: 'Full Body Massage', sold: 38, revenue: 95000 },
    { name: 'Hair Styling Package', sold: 32, revenue: 48000 }
  ];

  const downloadReport = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports & Analytics</h1>
        <p>Track your business performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">₹125,000</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">234</div>
          <div className="stat-label">Total Sales</div>
          <div className="stat-change positive">+8% from last month</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">189</div>
          <div className="stat-label">Redemptions</div>
          <div className="stat-change">80% redemption rate</div>
        </div>
      </div>

      {/* Filter and Download */}
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
            <button onClick={() => downloadReport('sales')} className="btn btn-outline">
              <Download size={18} />
              Sales Report
            </button>
            <button onClick={() => downloadReport('commission')} className="btn btn-outline">
              <Download size={18} />
              Commission Report
            </button>
          </div>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <TrendingUp size={20} />
            Sales Trend (Last 6 Months)
          </h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Vouchers Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data) => (
                <tr key={data.month}>
                  <td><strong>{data.month}</strong></td>
                  <td>{data.sales}</td>
                  <td>₹{data.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Vouchers */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Top Performing Vouchers</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher Name</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topVouchers.map((voucher, index) => (
                <tr key={index}>
                  <td><strong>{voucher.name}</strong></td>
                  <td>{voucher.sold}</td>
                  <td>₹{voucher.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProviderReports;
