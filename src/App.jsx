import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Customer Components
import CustomerDashboard from './components/Customer/CustomerDashboard';
import BrowseVouchers from './components/Customer/BrowseVouchers';
import VoucherDetails from './components/Customer/VoucherDetails';
import Wallet from './components/Customer/Wallet';
import GiftVoucher from './components/Customer/GiftVoucher';
import CustomerProfile from './components/Customer/CustomerProfile';
import PurchaseHistory from './components/Customer/PurchaseHistory';
import Support from './components/Customer/Support';

// Service Provider Components
import ProviderDashboard from './components/ServiceProvider/ProviderDashboard';
import VoucherManagement from './components/ServiceProvider/VoucherManagement';
import CreateVoucher from './components/ServiceProvider/CreateVoucher';
import RedemptionManagement from './components/ServiceProvider/RedemptionManagement';
import ProviderReports from './components/ServiceProvider/ProviderReports';
import ProviderProfile from './components/ServiceProvider/ProviderProfile';
import ManageServices from './components/ServiceProvider/ManageServices';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageProviders from './components/Admin/ManageProviders';
import ManageCustomers from './components/Admin/ManageCustomers';
import ManageVouchers from './components/Admin/ManageVouchers';
import AdminReports from './components/Admin/AdminReports';
import SupportDashboard from './components/Admin/SupportDashboard';
import CommissionManagement from './components/Admin/CommissionManagement';

// Shared Components
import Navbar from './components/Shared/Navbar';
import LiveChat from './components/Shared/LiveChat';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={`/${user.role}`} />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register onLogin={handleLogin} /> : <Navigate to={`/${user.role}`} />} 
          />

          {/* Customer Routes */}
          {user && user.role === 'customer' && (
            <>
              <Route path="/customer" element={<CustomerDashboard user={user} />} />
              <Route path="/customer/browse" element={<BrowseVouchers user={user} />} />
              <Route path="/customer/voucher/:id" element={<VoucherDetails user={user} />} />
              <Route path="/customer/wallet" element={<Wallet user={user} />} />
              <Route path="/customer/gift/:voucherId" element={<GiftVoucher user={user} />} />
              <Route path="/customer/profile" element={<CustomerProfile user={user} setUser={setUser} />} />
              <Route path="/customer/history" element={<PurchaseHistory user={user} />} />
              <Route path="/customer/support" element={<Support user={user} />} />
            </>
          )}

          {/* Service Provider Routes */}
          {user && user.role === 'provider' && (
            <>
              <Route path="/provider" element={<ProviderDashboard user={user} />} />
              <Route path="/provider/vouchers" element={<VoucherManagement user={user} />} />
              <Route path="/provider/services" element={<ManageServices user={user} />} />
              <Route path="/provider/create-voucher" element={<CreateVoucher user={user} />} />
              <Route path="/provider/redemptions" element={<RedemptionManagement user={user} />} />
              <Route path="/provider/reports" element={<ProviderReports user={user} />} />
              <Route path="/provider/profile" element={<ProviderProfile user={user} setUser={setUser} />} />
              <Route path="/provider/support" element={<Support user={user} />} />
            </>
          )}

          {/* Admin Routes */}
          {user && user.role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminDashboard user={user} />} />
              <Route path="/admin/providers" element={<ManageProviders user={user} />} />
              <Route path="/admin/customers" element={<ManageCustomers user={user} />} />
              <Route path="/admin/vouchers" element={<ManageVouchers user={user} />} />
              <Route path="/admin/reports" element={<AdminReports user={user} />} />
              <Route path="/admin/support" element={<SupportDashboard user={user} />} />
              <Route path="/admin/commission" element={<CommissionManagement user={user} />} />
            </>
          )}

          {/* Default Redirect */}
          <Route 
            path="/" 
            element={
              user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Live Chat Widget */}
        {user && <LiveChat user={user} />}
      </div>
    </Router>
  );
}

export default App;
