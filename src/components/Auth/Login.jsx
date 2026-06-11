import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, LogIn } from 'lucide-react';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // User credentials with role detection
      const users = {
        'admin@gmail.com': { 
          password: 'Admin@123', 
          role: 'admin', 
          name: 'Admin User', 
          id: '1' 
        },
        'serviceprovider1@gmail.com': { 
          password: 'Service@1', 
          role: 'provider', 
          name: 'Service Provider', 
          id: '2' 
        },
        'yash@gmail.com': { 
          password: 'yash@123', 
          role: 'customer', 
          name: 'Yash', 
          id: '3' 
        }
      };

      const user = users[formData.email];
      
      if (user && formData.password === user.password) {
        onLogin({
          id: user.id,
          name: user.name,
          email: formData.email,
          role: user.role,
          token: 'demo-token-' + Date.now()
        });
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img src="/images/logo.svg" alt="Gift Love" className="auth-logo-img" />
          </div>
          <h1>Gift Love Platform</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
