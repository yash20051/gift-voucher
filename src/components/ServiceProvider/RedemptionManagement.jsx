import React, { useState } from 'react';
import { QrCode, Search, CheckCircle } from 'lucide-react';
import './ServiceProvider.css';

const RedemptionManagement = ({ user }) => {
  const [qrCode, setQrCode] = useState('');
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [redemptions, setRedemptions] = useState([
    {
      id: 1,
      voucherId: 'V001',
      customerName: 'John Doe',
      voucherName: 'Spa Relaxation Package',
      value: 2000,
      redemptionDate: '2026-06-10',
      status: 'completed'
    },
    {
      id: 2,
      voucherId: 'V002',
      customerName: 'Jane Smith',
      voucherName: 'Full Body Massage',
      value: 2500,
      redemptionDate: '2026-06-09',
      status: 'completed'
    }
  ]);

  const handleQrSearch = () => {
    if (qrCode) {
      // Simulate voucher lookup
      setVoucherDetails({
        voucherId: qrCode,
        customerName: 'Sarah Johnson',
        voucherName: 'Spa Relaxation Package',
        value: 2000,
        purchaseDate: '2026-05-15',
        expiryDate: '2026-08-15',
        status: 'active'
      });
    }
  };

  const handleRedeem = () => {
    if (voucherDetails) {
      alert(`Voucher ${voucherDetails.voucherId} redeemed successfully!`);
      setRedemptions([
        {
          id: redemptions.length + 1,
          voucherId: voucherDetails.voucherId,
          customerName: voucherDetails.customerName,
          voucherName: voucherDetails.voucherName,
          value: voucherDetails.value,
          redemptionDate: new Date().toISOString().split('T')[0],
          status: 'completed'
        },
        ...redemptions
      ]);
      setVoucherDetails(null);
      setQrCode('');
    }
  };

  return (
    <div className="redemption-container">
      <div className="redemption-header">
        <h1>Redemption Management</h1>
        <p>Scan and validate customer vouchers</p>
      </div>

      {/* QR Code Scanner/Input */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <QrCode size={20} />
            Scan Voucher QR Code
          </h2>
        </div>
        <div className="qr-scanner">
          <div className="form-group">
            <label className="form-label">Enter Voucher ID or QR Code</label>
            <div className="search-input-group">
              <input
                type="text"
                className="form-input"
                placeholder="Enter voucher ID (e.g., V001)"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
              />
              <button onClick={handleQrSearch} className="btn btn-primary">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          {voucherDetails && (
            <div className="voucher-verification">
              <div className="verification-header">
                <CheckCircle size={24} color="#10b981" />
                <h3>Voucher Found!</h3>
              </div>
              <div className="verification-details">
                <div className="detail-row">
                  <span>Voucher ID:</span>
                  <strong>{voucherDetails.voucherId}</strong>
                </div>
                <div className="detail-row">
                  <span>Customer Name:</span>
                  <strong>{voucherDetails.customerName}</strong>
                </div>
                <div className="detail-row">
                  <span>Voucher:</span>
                  <strong>{voucherDetails.voucherName}</strong>
                </div>
                <div className="detail-row">
                  <span>Value:</span>
                  <strong>₹{voucherDetails.value}</strong>
                </div>
                <div className="detail-row">
                  <span>Purchase Date:</span>
                  <strong>{new Date(voucherDetails.purchaseDate).toLocaleDateString('en-IN')}</strong>
                </div>
                <div className="detail-row">
                  <span>Expiry Date:</span>
                  <strong>{new Date(voucherDetails.expiryDate).toLocaleDateString('en-IN')}</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <span className="badge badge-success">{voucherDetails.status.toUpperCase()}</span>
                </div>
              </div>
              <button onClick={handleRedeem} className="btn btn-primary btn-block">
                <CheckCircle size={18} />
                Redeem Voucher
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Redemptions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Redemptions</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher ID</th>
                <th>Customer</th>
                <th>Voucher Name</th>
                <th>Value</th>
                <th>Redemption Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {redemptions.map((redemption) => (
                <tr key={redemption.id}>
                  <td><strong>{redemption.voucherId}</strong></td>
                  <td>{redemption.customerName}</td>
                  <td>{redemption.voucherName}</td>
                  <td>₹{redemption.value}</td>
                  <td>{new Date(redemption.redemptionDate).toLocaleDateString('en-IN')}</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RedemptionManagement;
