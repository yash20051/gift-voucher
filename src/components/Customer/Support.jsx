import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, Upload, Send, User } from 'lucide-react';
import './Customer.css';

// Default seeded support tickets
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

const Support = ({ user }) => {
  const [allTickets, setAllTickets] = useState([]);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: '',
    attachments: []
  });

  // Load and seed tickets
  useEffect(() => {
    const storedTickets = localStorage.getItem('support_tickets');
    if (!storedTickets) {
      localStorage.setItem('support_tickets', JSON.stringify(defaultTickets));
      setAllTickets(defaultTickets);
    } else {
      setAllTickets(JSON.parse(storedTickets));
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

  // Filter for current user's tickets
  const userTickets = allTickets.filter(t => t.userId === user.id);

  const saveTickets = (updatedTickets) => {
    setAllTickets(updatedTickets);
    localStorage.setItem('support_tickets', JSON.stringify(updatedTickets));
  };

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

    const timestamp = new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const categoryMap = {
      general: 'General Query',
      redemption: 'Redemption Issue',
      payment: 'Payment Issue',
      gifting: 'Gifting Issue',
      technical: 'Technical Issue'
    };

    const newId = `TKT${String(allTickets.length + 1).padStart(3, '0')}`;

    const ticket = {
      id: newId,
      userId: user.id,
      userName: user.name,
      userType: user.role === 'customer' ? 'Customer' : 'Provider',
      subject: newTicket.subject,
      category: categoryMap[newTicket.category] || 'General Query',
      status: 'open',
      priority: newTicket.priority,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned',
      messages: [
        {
          id: 1,
          sender: 'user',
          senderName: user.name,
          text: newTicket.description,
          timestamp: timestamp
        }
      ]
    };

    const updatedTickets = [ticket, ...allTickets];
    saveTickets(updatedTickets);
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
      sender: 'user',
      senderName: user.name,
      text: replyMessage,
      timestamp: timestamp
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    const updatedAllTickets = allTickets.map(t => t.id === selectedTicket.id ? updatedTicket : t);
    saveTickets(updatedAllTickets);
    
    // Update local modal state
    setSelectedTicket(updatedTicket);
    setReplyMessage('');
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
          <div className="stat-value">{userTickets.filter(t => t.status === 'open').length}</div>
          <div className="stat-label">Open Tickets</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-value">{userTickets.filter(t => t.status === 'in-progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{userTickets.filter(t => t.status === 'resolved').length}</div>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userTickets.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No tickets found. Create a ticket to seek assistance.
                  </td>
                </tr>
              ) : (
                userTickets.map((ticket) => (
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
                        {ticket.messages.length}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedTicket(ticket)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        View Chat
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
                    <Upload size={16} style={{ marginRight: '0.25rem' }} />
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

      {/* Ticket Details & Chat Modal */}
      {selectedTicket && (
        <div className="modal-overlay">
          <div className="modal support-chat-modal" style={{ maxWidth: '650px', display: 'flex', flexDirection: 'column', height: '80vh', maxHeight: '700px' }}>
            <div className="modal-header" style={{ flexShrink: 0 }}>
              <div>
                <h2 className="modal-title" style={{ fontSize: '1.25rem' }}>Ticket {selectedTicket.id} Details</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {getStatusBadge(selectedTicket.status)}
                  {getPriorityBadge(selectedTicket.priority)}
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="close-btn">
                ×
              </button>
            </div>
            
            <div className="modal-body support-chat-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'hidden', padding: '1rem' }}>
              {/* Ticket details info */}
              <div className="ticket-meta-info" style={{ 
                flexShrink: 0, 
                padding: '0.75rem 1rem', 
                marginBottom: '1rem', 
                background: 'var(--bg-light)', 
                borderRadius: '0.5rem', 
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem' 
              }}>
                <div style={{ margin: '0.25rem 0' }}><strong>Subject:</strong> {selectedTicket.subject}</div>
                <div style={{ margin: '0.25rem 0' }}><strong>Category:</strong> {selectedTicket.category}</div>
                <div style={{ margin: '0.25rem 0' }}><strong>Assigned Agent:</strong> {selectedTicket.assignedTo}</div>
                <div style={{ margin: '0.25rem 0' }}><strong>Created Date:</strong> {new Date(selectedTicket.createdDate).toLocaleDateString('en-IN')}</div>
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
                        alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUserMessage ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>
                        {isUserMessage ? 'You' : msg.senderName} • {msg.timestamp}
                      </div>
                      <div style={{ 
                        padding: '0.75rem 1rem', 
                        borderRadius: isUserMessage ? '0.75rem 0.75rem 0 0.75rem' : '0.75rem 0.75rem 0.75rem 0',
                        background: isUserMessage ? 'var(--primary-color)' : 'white',
                        color: isUserMessage ? 'white' : 'var(--text-primary)',
                        boxShadow: 'var(--shadow-sm)',
                        border: isUserMessage ? 'none' : '1px solid var(--border-color)',
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
              {selectedTicket.status === 'resolved' && (
                <div className="alert alert-success" style={{ width: '100%', margin: 0, padding: '0.5rem', fontSize: '0.8rem', textAlign: 'center', borderRadius: '0.25rem' }}>
                  This ticket has been marked as <strong>Resolved</strong>.
                </div>
              )}
              
              <form onSubmit={handleSendReply} style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type a response message..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, margin: 0 }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem' }}>
                  <Send size={14} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
