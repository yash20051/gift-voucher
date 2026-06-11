import React, { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './Admin.css';

const SupportDashboard = ({ user }) => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [tickets, setTickets] = useState([
    {
      id: 'TKT001',
      customerName: 'John Doe',
      userType: 'Customer',
      subject: 'Unable to redeem voucher',
      category: 'Redemption Issue',
      status: 'in-progress',
      priority: 'high',
      createdDate: '2026-06-08',
      assignedTo: 'Support Agent 1'
    },
    {
      id: 'TKT002',
      customerName: 'Luxury Spa',
      userType: 'Provider',
      subject: 'Commission report issue',
      category: 'Payment Issue',
      status: 'open',
      priority: 'medium',
      createdDate: '2026-06-09',
      assignedTo: 'Unassigned'
    },
    {
      id: 'TKT003',
      customerName: 'Jane Smith',
      userType: 'Customer',
      subject: 'Gift delivery date query',
      category: 'General Query',
      status: 'resolved',
      priority: 'low',
      createdDate: '2026-06-05',
      assignedTo: 'Support Agent 2'
    }
  ]);

  const filteredTickets = selectedStatus === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === selectedStatus);

  const getStatusBadge = (status) => {
    const badgeClass = status === 'open' ? 'badge-warning' :
                       status === 'in-progress' ? 'badge-primary' : 'badge-success';
    return <span className={`badge ${badgeClass}`}>{status.replace('-', ' ').toUpperCase()}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badgeClass = priority === 'high' ? 'badge-danger' :
                       priority === 'medium' ? 'badge-warning' : 'badge-primary';
    return <span className={`badge ${badgeClass}`}>{priority.toUpperCase()}</span>;
  };

  return (
    <div className="support-dashboard-container">
      <div className="support-dashboard-header">
        <div>
          <h1>Support Dashboard</h1>
          <p>Manage all support tickets and live chats</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4">
        <div className="stat-card warning">
          <div className="stat-icon">
            <AlertCircle size={32} />
          </div>
          <div className="stat-value">{tickets.filter(t => t.status === 'open').length}</div>
          <div className="stat-label">Open Tickets</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={32} />
          </div>
          <div className="stat-value">{tickets.filter(t => t.status === 'in-progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <CheckCircle size={32} />
          </div>
          <div className="stat-value">{tickets.filter(t => t.status === 'resolved').length}</div>
          <div className="stat-label">Resolved</div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          <div className="stat-icon">
            <MessageSquare size={32} />
          </div>
          <div className="stat-value">{tickets.length}</div>
          <div className="stat-label">Total Tickets</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="status-filters">
          <button 
            className={`filter-btn ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All ({tickets.length})
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'open' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('open')}
          >
            Open ({tickets.filter(t => t.status === 'open').length})
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'in-progress' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('in-progress')}
          >
            In Progress ({tickets.filter(t => t.status === 'in-progress').length})
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'resolved' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('resolved')}
          >
            Resolved ({tickets.filter(t => t.status === 'resolved').length})
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><strong>{ticket.id}</strong></td>
                  <td>{ticket.customerName}</td>
                  <td>{ticket.userType}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.category}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{ticket.assignedTo}</td>
                  <td>{new Date(ticket.createdDate).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
