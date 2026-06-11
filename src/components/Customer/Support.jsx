import React, { useState } from 'react';
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import './Customer.css';

const Support = ({ user }) => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: '',
    attachments: []
  });

  const [tickets, setTickets] = useState([
    {
      id: 'TKT001',
      subject: 'Unable to redeem voucher',
      category: 'Redemption Issue',
      status: 'in-progress',
      priority: 'high',
      createdDate: '2026-06-08',
      lastUpdate: '2026-06-09',
      messages: 3
    },
    {
      id: 'TKT002',
      subject: 'Question about gift delivery date',
      category: 'General Query',
      status: 'resolved',
      priority: 'low',
      createdDate: '2026-06-05',
      lastUpdate: '2026-06-06',
      messages: 5
    },
    {
      id: 'TKT003',
      subject: 'Payment failed but amount deducted',
      category: 'Payment Issue',
      status: 'open',
      priority: 'high',
      createdDate: '2026-06-10',
      lastUpdate: '2026-06-10',
      messages: 1
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} color="#f59e0b" />;
      case 'in-progress': return <Clock size={16} color="#6366f1" />;
      case 'resolved': return <CheckCircle size={16} color="#10b981" />;
      default: return null;
    }
  };

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

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'open',
      priority: newTicket.priority,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      messages: 1
    };
    setTickets([ticket, ...tickets]);
    setShowCreateTicket(false);
    setNewTicket({
      subject: '',
      category: 'general',
      priority: 'medium',
      description: '',
      attachments: []
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewTicket({ ...newTicket, attachments: [...newTicket.attachments, ...files] });
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <div>
          <h1>Support Center</h1>
          <p>Get help with your issues</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateTicket(true)}
        >
          <Plus size={18} />
          Create Ticket
        </button>
      </div>

      {/* Support Stats */}
      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{tickets.filter(t => t.status === 'open').length}</div>
          <div className="stat-label">Open Tickets</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">{tickets.filter(t => t.status === 'in-progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{tickets.filter(t => t.status === 'resolved').length}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Support Tickets</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Update</th>
                <th>Messages</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><strong>{ticket.id}</strong></td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.category}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{new Date(ticket.createdDate).toLocaleDateString('en-IN')}</td>
                  <td>{new Date(ticket.lastUpdate).toLocaleDateString('en-IN')}</td>
                  <td>
                    <span className="messages-count">
                      <MessageSquare size={14} />
                      {ticket.messages}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Create Support Ticket</h2>
              <button onClick={() => setShowCreateTicket(false)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTicket}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    >
                      <option value="general">General Query</option>
                      <option value="redemption">Redemption Issue</option>
                      <option value="payment">Payment Issue</option>
                      <option value="gifting">Gifting Issue</option>
                      <option value="technical">Technical Issue</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Please describe your issue in detail..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    rows="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Upload size={16} />
                    Attachments (Screenshots/Documents)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="form-input"
                  />
                  {newTicket.attachments.length > 0 && (
                    <div className="attachment-list">
                      {newTicket.attachments.map((file, index) => (
                        <span key={index} className="attachment-item">{file.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateTicket(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
