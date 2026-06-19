import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send, User } from 'lucide-react';
import './Admin.css';

// Default seeded support tickets (aligned with Customer/Provider view)
const defaultTickets = [
  {
    id: 'TKT001',
    userId: '3', // Yash (Customer)
    userName: 'Yash',
    userType: 'Customer',
    subject: 'Unable to redeem voucher',
    category: 'Redemption Issue',
    status: 'in-progress',
    priority: 'high',
    createdDate: '2026-06-08',
    lastUpdate: '2026-06-09',
    assignedTo: 'Support Agent 1',
    messages: [
      {
        id: 1,
        sender: 'user',
        senderName: 'Yash',
        text: 'I tried to redeem my voucher at the Luxury Spa, but it says invalid code.',
        timestamp: '08/06/2026, 10:30 AM'
      },
      {
        id: 2,
        sender: 'support',
        senderName: 'Support Agent 1',
        text: 'Hello Yash, we are looking into this with the provider. Could you please share the voucher code?',
        timestamp: '09/06/2026, 02:15 PM'
      },
      {
        id: 3,
        sender: 'user',
        senderName: 'Yash',
        text: 'Sure, the voucher code is LSPA-9902-8812.',
        timestamp: '09/06/2026, 03:00 PM'
      }
    ]
  },
  {
    id: 'TKT002',
    userId: '2', // Service Provider
    userName: 'Service Provider',
    userType: 'Provider',
    subject: 'Commission report issue',
    category: 'Payment Issue',
    status: 'open',
    priority: 'medium',
    createdDate: '2026-06-09',
    lastUpdate: '2026-06-09',
    assignedTo: 'Unassigned',
    messages: [
      {
        id: 1,
        sender: 'user',
        senderName: 'Service Provider',
        text: 'The commission calculated for the last week is incorrect. It should be 10% instead of 12%.',
        timestamp: '09/06/2026, 11:00 AM'
      }
    ]
  },
  {
    id: 'TKT003',
    userId: '3', // Yash (Customer)
    userName: 'Yash',
    userType: 'Customer',
    subject: 'Question about gift delivery date',
    category: 'General Query',
    status: 'resolved',
    priority: 'low',
    createdDate: '2026-06-05',
    lastUpdate: '2026-06-06',
    assignedTo: 'Support Agent 2',
    messages: [
      {
        id: 1,
        sender: 'user',
        senderName: 'Yash',
        text: 'Can I schedule the gift delivery for midnight on June 25th?',
        timestamp: '05/06/2026, 09:00 AM'
      },
      {
        id: 2,
        sender: 'support',
        senderName: 'Support Agent 2',
        text: 'Yes! You can choose the exact date and time for voucher delivery during checkout.',
        timestamp: '06/06/2026, 10:00 AM'
      }
    ]
  }
];

const SupportDashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Load and seed tickets
  useEffect(() => {
    const storedTickets = localStorage.getItem('support_tickets');
    if (!storedTickets) {
      localStorage.setItem('support_tickets', JSON.stringify(defaultTickets));
      setTickets(defaultTickets);
    } else {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedTicket) {
      scrollToBottom();
    }
  }, [selectedTicket?.messages]);

  const saveTickets = (updatedTickets) => {
    setTickets(updatedTickets);
    localStorage.setItem('support_tickets', JSON.stringify(updatedTickets));
  };

  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        return { 
          ...t, 
          status: newStatus,
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return t;
    });
    saveTickets(updatedTickets);

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAssigneeChange = (ticketId, newAssignee) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        return { 
          ...t, 
          assignedTo: newAssignee,
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return t;
    });
    saveTickets(updatedTickets);

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, assignedTo: newAssignee }));
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    const timestamp = new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const newMessage = {
      id: selectedTicket.messages.length + 1,
      sender: 'support',
      senderName: selectedTicket.assignedTo !== 'Unassigned' ? selectedTicket.assignedTo : 'Admin User',
      text: replyMessage,
      timestamp: timestamp
    };

    const updatedTicket = {
      ...selectedTicket,
      // Automatically move from open to in-progress when admin replies
      status: selectedTicket.status === 'open' ? 'in-progress' : selectedTicket.status,
      messages: [...selectedTicket.messages, newMessage],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    const updatedTickets = tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t);
    saveTickets(updatedTickets);

    setSelectedTicket(updatedTicket);
    setReplyMessage('');
  };

  // Filtering
  const filteredTickets = tickets.filter(t => {
    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    const matchesUserType = selectedUserType === 'all' || t.userType === selectedUserType;
    return matchesStatus && matchesUserType;
  });

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

      {/* Filters Panel */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
        <div className="status-filters" style={{ margin: 0 }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>User Type:</label>
          <select 
            className="form-select" 
            style={{ width: '150px', margin: 0, padding: '0.4rem 0.8rem', fontSize: '0.875rem', height: '38px' }}
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="Customer">Customers</option>
            <option value="Provider">Providers</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User Name</th>
                <th>User Type</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No tickets found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td><strong>{ticket.id}</strong></td>
                    <td>{ticket.userName || ticket.customerName}</td>
                    <td>
                      <span className={`badge ${ticket.userType === 'Customer' ? 'badge-primary' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                        {ticket.userType}
                      </span>
                    </td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.category}</td>
                    <td>{getPriorityBadge(ticket.priority)}</td>
                    <td>{getStatusBadge(ticket.status)}</td>
                    <td>
                      <select
                        value={ticket.assignedTo}
                        onChange={(e) => handleAssigneeChange(ticket.id, e.target.value)}
                        className="form-select"
                        style={{ margin: 0, padding: '0.2rem 0.4rem', fontSize: '0.8rem', width: '140px', height: '30px' }}
                      >
                        <option value="Unassigned">Unassigned</option>
                        <option value="Support Agent 1">Support Agent 1</option>
                        <option value="Support Agent 2">Support Agent 2</option>
                        <option value="Support Agent 3">Support Agent 3</option>
                        <option value="Admin User">Admin User</option>
                      </select>
                    </td>
                    <td>{new Date(ticket.createdDate).toLocaleDateString('en-IN')}</td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedTicket(ticket)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        Manage Chat
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Ticket Chat & Manage Modal */}
      {selectedTicket && (
        <div className="modal-overlay">
          <div className="modal support-chat-modal" style={{ maxWidth: '650px', display: 'flex', flexDirection: 'column', height: '80vh', maxHeight: '700px' }}>
            <div className="modal-header" style={{ flexShrink: 0 }}>
              <div>
                <h2 className="modal-title" style={{ fontSize: '1.25rem' }}>Manage Ticket {selectedTicket.id}</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    By {selectedTicket.userName} ({selectedTicket.userType})
                  </span>
                  {getPriorityBadge(selectedTicket.priority)}
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="close-btn">
                ×
              </button>
            </div>
            
            <div className="modal-body support-chat-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'hidden', padding: '1rem' }}>
              
              {/* Inline settings editor */}
              <div className="ticket-meta-info" style={{ 
                flexShrink: 0, 
                padding: '0.75rem 1rem', 
                marginBottom: '1rem', 
                background: 'var(--bg-light)', 
                borderRadius: '0.5rem', 
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Status</label>
                  <select 
                    className="form-select"
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', height: '36px' }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Assign Agent</label>
                  <select 
                    className="form-select"
                    value={selectedTicket.assignedTo}
                    onChange={(e) => handleAssigneeChange(selectedTicket.id, e.target.value)}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', height: '36px' }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Support Agent 1">Support Agent 1</option>
                    <option value="Support Agent 2">Support Agent 2</option>
                    <option value="Support Agent 3">Support Agent 3</option>
                    <option value="Admin User">Admin User</option>
                  </select>
                </div>
              </div>

              {/* Chat Message Logs */}
              <div className="chat-messages-container" style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1rem', 
                background: 'var(--bg-light)', 
                borderRadius: '0.5rem', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {selectedTicket.messages.map((msg) => {
                  const isUserMessage = msg.sender === 'user';
                  return (
                    <div 
                      key={msg.id} 
                      style={{ 
                        alignSelf: isUserMessage ? 'flex-start' : 'flex-end',
                        maxWidth: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUserMessage ? 'flex-start' : 'flex-end'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>
                        {msg.senderName} • {msg.timestamp}
                      </div>
                      <div style={{ 
                        padding: '0.75rem 1rem', 
                        borderRadius: isUserMessage ? '0.75rem 0.75rem 0.75rem 0' : '0.75rem 0.75rem 0 0.75rem',
                        background: isUserMessage ? 'white' : 'var(--primary-color)',
                        color: isUserMessage ? 'var(--text-primary)' : 'white',
                        boxShadow: 'var(--shadow-sm)',
                        border: isUserMessage ? '1px solid var(--border-color)' : 'none',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="modal-footer" style={{ flexShrink: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <form onSubmit={handleSendReply} style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type a response message as Admin..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, margin: 0 }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem' }}>
                  <Send size={14} />
                  <span>Reply</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportDashboard;
