import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gift, Menu, X, User, LogOut, Home, ShoppingBag, Wallet, Users, Building, BarChart2 } from 'lucide-react';
import './Shared.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getNavLinks = () => {
    switch (user.role) {
      case 'customer':
        return [
          { path: '/customer', label: 'Dashboard', icon: <Home size={18} /> },
          { path: '/customer/browse', label: 'Browse', icon: <ShoppingBag size={18} /> },
          { path: '/customer/wallet', label: 'Wallet', icon: <Wallet size={18} /> },
          { path: '/customer/history', label: 'History', icon: <BarChart2 size={18} /> }
        ];
      case 'provider':
        return [
          { path: '/provider', label: 'Dashboard', icon: <Home size={18} /> },
          { path: '/provider/services', label: 'Services', icon: <ShoppingBag size={18} /> },
          { path: '/provider/vouchers', label: 'Vouchers', icon: <Gift size={18} /> },
          { path: '/provider/redemptions', label: 'Redemptions', icon: <Users size={18} /> },
          { path: '/provider/reports', label: 'Reports', icon: <BarChart2 size={18} /> }
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: <Home size={18} /> },
          { path: '/admin/providers', label: 'Providers', icon: <Building size={18} /> },
          { path: '/admin/customers', label: 'Customers', icon: <Users size={18} /> },
          { path: '/admin/vouchers', label: 'Vouchers', icon: <Gift size={18} /> },
          { path: '/admin/reports', label: 'Reports', icon: <BarChart2 size={18} /> }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to={`/${user.role}`} className="navbar-brand">
          <img src="/images/logo.svg" alt="Gift Love" className="navbar-logo" />
          <span>Gift Love</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="navbar-user">
          <button
            className="user-menu-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="user-menu-dropdown">
              <Link
                to={`/${user.role}/profile`}
                className="user-menu-item"
                onClick={() => setShowUserMenu(false)}
              >
                <User size={16} />
                Profile
              </Link>
              <button
                className="user-menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <Link
            to={`/${user.role}/profile`}
            className="mobile-nav-link"
            onClick={() => setShowMobileMenu(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
          <button
            className="mobile-nav-link"
            onClick={() => {
              setShowMobileMenu(false);
              onLogout();
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
