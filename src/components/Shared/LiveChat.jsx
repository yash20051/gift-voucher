import React, { useState } from 'react';
import { MessageSquare, X, Send, Minimize2 } from 'lucide-react';
import './Shared.css';

const LiveChat = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      text: 'Hello! How can I help you today?',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: messages.length + 2,
          sender: 'support',
          text: 'Thank you for your message. A support agent will respond shortly.',
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, supportResponse]);
      }, 1000);
    }
  };

  if (!isOpen) {
    return (
      <button
        className="live-chat-fab"
        onClick={() => setIsOpen(true)}
        title="Live Chat"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className={`live-chat-widget ${isMinimized ? 'minimized' : ''}`}>
      <div className="live-chat-header">
        <div className="chat-header-info">
          <MessageSquare size={20} />
          <div>
            <h3>Live Support</h3>
            <span className="online-status">● Online</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="chat-action-btn"
            title="Minimize"
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="chat-action-btn"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="live-chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'support-message'}`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="live-chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={!message.trim()}>
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LiveChat;
