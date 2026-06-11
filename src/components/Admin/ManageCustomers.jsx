import React, { useState } from 'react';
import { Search, Eye, Ban } from 'lucide-react';
import './Admin.css';

const ManageCustomers = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      vouchers: 12,
      spent: 24500,
      status: 'active',
      joinedDate: '2026-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      vouchers: 8,
      spent: 16000,
      status: 'active',
      joinedDate: '2026-04-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      vouchers: 15,
      spent: 32000,
      status: 'active',
      joinedDate: '2026-02-20'
    }
  ]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-customers-container">
      <div className="manage-customers-header">
        <div>
          <h1>Manage Customers</h1>
          <p>Monitor and manage all customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">{customers.reduce((sum, c) => sum + c.vouchers, 0)}</div>
          <div className="stat-label">Total Vouchers Purchased</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">₹{(customers.reduce((sum, c) => sum + c.spent, 0) / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vouchers</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td><strong>{customer.name}</strong></td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.vouchers}</td>
                  <td>₹{customer.spent.toLocaleString()}</td>
                  <td>{new Date(customer.joinedDate).toLocaleDateString('en-IN')}</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <div className="action-buttons-inline">
                      <button className="btn-icon" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon danger" title="Suspend">
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;
