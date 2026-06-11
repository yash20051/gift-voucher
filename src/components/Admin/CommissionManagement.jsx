import React, { useState } from 'react';
import { DollarSign, Download, TrendingUp } from 'lucide-react';
import './Admin.css';

const CommissionManagement = ({ user }) => {
  const [commissionRate, setCommissionRate] = useState(10);

  const [settlements, setSettlements] = useState([
    {
      id: 1,
      provider: 'Luxury Spa & Wellness',
      sales: 145,
      revenue: 290000,
      commission: 29000,
      settled: 261000,
      status: 'paid',
      date: '2026-06-01'
    },
    {
      id: 2,
      provider: 'FitZone Gym',
      sales: 98,
      revenue: 245000,
      commission: 24500,
      settled: 220500,
      status: 'paid',
      date: '2026-06-01'
    },
    {
      id: 3,
      provider: 'Glamour Salon',
      sales: 87,
      revenue: 195000,
      commission: 19500,
      settled: 175500,
      status: 'pending',
      date: '2026-06-10'
    }
  ]);

  return (
    <div className="commission-container">
      <div className="commission-header">
        <div>
          <h1>Commission Management</h1>
          <p>Manage platform commission and settlements</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-value">₹{(settlements.reduce((sum, s) => sum + s.commission, 0) / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Commission</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
          <div className="stat-value">{commissionRate}%</div>
          <div className="stat-label">Commission Rate</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-value">{settlements.filter(s => s.status === 'pending').length}</div>
          <div className="stat-label">Pending Settlements</div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Commission Settings</h2>
        </div>
        <div className="commission-settings">
          <div className="form-group">
            <label className="form-label">Platform Commission Rate (%)</label>
            <div className="input-group">
              <input
                type="number"
                className="form-input"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                min="0"
                max="100"
              />
              <button className="btn btn-primary">Update Rate</button>
            </div>
          </div>
        </div>
      </div>

      {/* Settlement Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Settlement History</h2>
          <button className="btn btn-outline">
            <Download size={18} />
            Export
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Commission ({commissionRate}%)</th>
                <th>Amount Settled</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td><strong>{settlement.provider}</strong></td>
                  <td>{settlement.sales}</td>
                  <td>₹{settlement.revenue.toLocaleString()}</td>
                  <td>₹{settlement.commission.toLocaleString()}</td>
                  <td>₹{settlement.settled.toLocaleString()}</td>
                  <td>
                    {settlement.status === 'paid' ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>{new Date(settlement.date).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionManagement;
