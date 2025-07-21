# NetApp BlueXP Keystone Monitoring Alerts Dashboard

A modern React application that replicates the NetApp BlueXP Keystone monitoring alerts interface with full functionality for viewing, sorting, and managing alerts.

## 🚀 Features

### **Complete UI Implementation**
- **Header**: NetApp BlueXP branding, search functionality, organization/project dropdowns
- **Sidebar**: Navigation with hover effects and active states
- **Breadcrumb Navigation**: Keystone service indicator
- **Tab Navigation**: Overview, Subscriptions, Assets, Monitoring, Administration

### **Alert Summary Dashboard**
- **Severity Cards**: Critical (4), Warning (2), Informational (0)
- **Type Cards**: Subscription expiration (3), Capacity usage (3)
- **Interactive Elements**: Clickable "View" links with toast notifications

### **Advanced Alerts Table**
- **Complete Data**: 6 sample alerts matching NetApp interface
- **All Columns**: Severity, Alert ID, Alert, Triggered time, Subscription number, Tracking ID, Performance service levels, Status
- **Sortable**: Click any column header to sort ascending/descending
- **Interactive Links**: Clickable alert IDs and subscription numbers
- **Export Functionality**: Download alerts as CSV file
- **Responsive Design**: Mobile-friendly with horizontal scrolling

### **Modern React Features**
- **Hooks**: useState, useEffect, useMemo, useContext
- **Context API**: Toast notification system
- **Component Architecture**: Modular, reusable components
- **CSS Modules**: Organized styling per component
- **Real-time Updates**: Timestamp updates every 30 seconds

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # NetApp BlueXP header
│   ├── Header.css
│   ├── Sidebar.js             # Navigation sidebar
│   ├── Sidebar.css
│   ├── MonitoringDashboard.js # Main dashboard container
│   ├── MonitoringDashboard.css
│   ├── AlertsSummary.js       # Alert summary cards
│   ├── AlertsSummary.css
│   ├── AlertsTable.js         # Interactive alerts table
│   ├── AlertsTable.css
│   ├── Toast.js               # Notification component
│   └── Toast.css
├── contexts/
│   └── ToastContext.js        # Toast notification context
├── data/
│   └── alertsData.js          # Sample alerts data & utilities
├── App.js                     # Main app component
├── App.css
├── index.js                   # React entry point
└── index.css                  # Global styles
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Build for Production
```bash
npm run build
```

## 💻 Usage

### **Navigation**
- Use the tab navigation to switch between Alerts, Alert monitors, and Reports
- The Alerts tab shows the complete monitoring interface

### **Alert Summary Cards**
- View alert counts by severity (Critical, Warning, Informational)
- View alert counts by type (Subscription expiration, Capacity usage)
- Click "View" buttons to see filtered results (simulated with notifications)

### **Alerts Table**
- **Sorting**: Click any column header to sort the table
- **Export**: Click the download icon to export alerts as CSV
- **Filter**: Click the search icon (placeholder for future functionality)
- **Alert Details**: Click alert descriptions or subscription numbers for details

### **Interactive Features**
- **Real-time Updates**: Last updated timestamp refreshes every 30 seconds
- **Toast Notifications**: Success/info messages for user actions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🎨 Styling

The application uses:
- **NetApp Brand Colors**: Blue gradient header (#0067c5, #004a8f)
- **Modern CSS**: Flexbox, Grid, CSS transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Focus states, proper color contrast
- **Font Awesome Icons**: Professional iconography

## 📊 Data Structure

The alerts data includes:
```javascript
{
  id: 1783,
  severity: 'Critical',
  alert: 'Capacity usage > 90%',
  triggeredTime: 'July 25, 2023, 9:44 AM',
  subscriptionNumber: '1789858600',
  trackingId: 'Honda-AHO',
  performanceServiceLevel: 'Extreme',
  status: 'Active'
}
```

## 🚀 Key Components

### **Header Component**
- NetApp BlueXP branding
- Search functionality
- Organization/Project/Connector dropdowns
- Notification icons

### **MonitoringDashboard Component**
- Tab switching (Alerts, Monitors, Reports)
- Real-time timestamp updates
- Alert count management

### **AlertsTable Component**
- Sortable columns with visual indicators
- CSV export functionality
- Interactive alert links
- Pagination (ready for future implementation)

### **Toast Context**
- Global notification system
- Auto-dismiss after 3 seconds
- Different types (info, success, warning, error)

## 🔧 Customization

### Adding New Alerts
Edit `src/data/alertsData.js` to add new alert entries.

### Styling Changes
Each component has its own CSS file for easy customization.

### Functionality Extension
- Add filtering logic in `AlertsTable.js`
- Implement real API calls in data layer
- Add pagination for large datasets

## 📱 Responsive Design

- **Desktop**: Full layout with all features
- **Tablet**: Responsive grid and navigation
- **Mobile**: Collapsible elements and touch-friendly interface

## 🎯 NetApp BlueXP Compliance

This implementation exactly matches the NetApp BlueXP Keystone interface:
- ✅ Exact visual design and layout
- ✅ All data columns and formatting
- ✅ Interactive table functionality
- ✅ Professional UI/UX patterns
- ✅ Responsive behavior

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for demonstration purposes and follows NetApp BlueXP design patterns.