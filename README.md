# Gift Voucher Marketplace & Gifting Platform

A comprehensive digital voucher marketplace platform built with React, featuring three user roles: Admin, Service Provider, and Customer.

## 🚀 Features

### Customer Module
- **Browse & Purchase Vouchers**: Discover and buy vouchers from various service providers
- **Digital Wallet**: Manage all purchased, received, and redeemed vouchers in one place
- **Gift Vouchers**: Send vouchers as gifts with personalized messages, images, or videos
- **QR Code Redemption**: Easy voucher redemption using QR codes
- **Purchase History**: Track all transactions and download invoices
- **Support System**: Create tickets and access live chat support

### Service Provider Module
- **Dashboard**: View business performance metrics and analytics
- **Voucher Management**: Create and manage service vouchers
- **Redemption Management**: Scan and validate customer vouchers
- **Reports**: Access sales reports and analytics
- **Commission Tracking**: Monitor earnings and settlements
- **Profile Management**: Update business information

### Admin Module
- **Platform Dashboard**: Overview of entire platform performance
- **Provider Management**: Approve, manage, and monitor service providers
- **Customer Management**: View and manage customer accounts
- **Voucher Management**: Create platform-wide promotional vouchers
- **Support Dashboard**: Manage all support tickets and live chats
- **Reports & Analytics**: Comprehensive platform insights
- **Commission Management**: Set commission rates and manage settlements

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Lucide React
- **QR Codes**: qrcode.react
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
cd gift-voucher-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## 🔐 Login Credentials

### Admin
- **Email**: admin@gmail.com
- **Password**: Admin@123

### Service Provider
- **Email**: serviceprovider1@gmail.com
- **Password**: Service@1

### Customer
- **Email**: yash@gmail.com
- **Password**: yash@123

**Note:** The system automatically detects your role based on your email address. No need to select a role during login.

## 📁 Project Structure

```
gift-voucher-platform/
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageProviders.jsx
│   │   │   ├── ManageCustomers.jsx
│   │   │   ├── ManageVouchers.jsx
│   │   │   ├── AdminReports.jsx
│   │   │   ├── SupportDashboard.jsx
│   │   │   ├── CommissionManagement.jsx
│   │   │   └── Admin.css
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   ├── Customer/
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── BrowseVouchers.jsx
│   │   │   ├── VoucherDetails.jsx
│   │   │   ├── GiftVoucher.jsx
│   │   │   ├── Wallet.jsx
│   │   │   ├── PurchaseHistory.jsx
│   │   │   ├── Support.jsx
│   │   │   ├── CustomerProfile.jsx
│   │   │   └── Customer.css
│   │   ├── ServiceProvider/
│   │   │   ├── ProviderDashboard.jsx
│   │   │   ├── VoucherManagement.jsx
│   │   │   ├── CreateVoucher.jsx
│   │   │   ├── RedemptionManagement.jsx
│   │   │   ├── ProviderReports.jsx
│   │   │   ├── ProviderProfile.jsx
│   │   │   └── ServiceProvider.css
│   │   └── Shared/
│   │       ├── Navbar.jsx
│   │       ├── LiveChat.jsx
│   │       └── Shared.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Features Implemented

### 1. Gift Voucher Workflow
- Select voucher → Choose recipient → Add personalized message/media → Schedule delivery → Complete payment

### 2. Redemption System
- QR code generation for each voucher
- Service provider can scan and validate vouchers
- Real-time status updates

### 3. Multi-Media Gifting
- Text messages
- Image attachments
- Video attachments
- Scheduled delivery dates

### 4. Wallet Management
- Active vouchers
- Received gifts
- Redeemed vouchers
- Expired vouchers
- Easy filtering and search

### 5. Support System
- Ticket creation with file attachments
- Priority-based ticket management
- Live chat widget
- Support dashboard for admins

### 6. Reports & Analytics
- Sales tracking
- Revenue analytics
- Commission reports
- Top-performing vouchers
- Monthly trends

### 7. Payment Integration Ready
- Support for multiple payment methods (UPI, Cards, Wallets)
- Commission calculation
- Settlement management

## 🎨 Design Highlights

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Color-coded Stats**: Visual indicators for different metrics
- **Easy Navigation**: Role-based navigation with clear menu structure
- **Interactive Elements**: Hover effects, transitions, and feedback

## 🔄 State Management

Currently using React's built-in state management:
- `useState` for local component state
- `localStorage` for user session persistence
- Props for data passing between components

## 🚧 Future Enhancements

Based on the BRD, these features can be added:

1. **Backend Integration**
   - REST API implementation
   - Database integration (MongoDB/PostgreSQL)
   - Authentication & Authorization (JWT)

2. **Payment Gateway**
   - Razorpay/Stripe integration
   - Wallet system
   - Reward coins & loyalty points

3. **Advanced Features**
   - Group gifting
   - Corporate gifting portals
   - Referral programs
   - AI-based recommendations
   - Subscription packages

4. **Notifications**
   - Email notifications
   - SMS alerts
   - Push notifications
   - In-app notifications

5. **Enhanced Analytics**
   - Advanced reporting
   - Data visualization (Charts/Graphs)
   - Export to Excel/PDF

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a demo project. For production use, consider:
- Adding proper authentication
- Implementing a backend API
- Adding data validation
- Implementing error boundaries
- Adding unit and integration tests

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer Notes

- All data is currently mocked for demonstration
- No actual API calls are made
- Local storage is used for session management
- Forms submit successfully but don't persist to a database
- Payment integration is simulated

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

**Developed with ❤️ using React + Vite**
