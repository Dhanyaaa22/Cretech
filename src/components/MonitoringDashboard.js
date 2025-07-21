import React, { useState, useEffect } from 'react';
import AlertsSummary from './AlertsSummary';
import AlertsTable from './AlertsTable';
import { getAlertCounts } from '../data/alertsData';
import './MonitoringDashboard.css';

const MonitoringDashboard = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const alertCounts = getAlertCounts();

  return (
    <div className="monitoring-dashboard">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <i className="fas fa-star"></i>
        <div className="keystone-badge">
          <i className="fas fa-key"></i>
          <span>Keystone</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="page-nav">
        <a href="#overview" className="nav-tab">Overview</a>
        <a href="#subscriptions" className="nav-tab">Subscriptions</a>
        <a href="#assets" className="nav-tab">Assets</a>
        <a href="#monitoring" className="nav-tab active">Monitoring</a>
        <a href="#administration" className="nav-tab">Administration</a>
      </nav>

      {/* Monitoring Section */}
      <div className="monitoring-container">
        <div className="monitoring-header">
          <h1>Monitoring</h1>
          <div className="last-updated">
            <i className="fas fa-sync-alt"></i>
            <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="sub-nav">
          <button 
            className={`sub-nav-tab ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => handleTabChange('alerts')}
          >
            Alerts
          </button>
          <button 
            className={`sub-nav-tab ${activeTab === 'monitors' ? 'active' : ''}`}
            onClick={() => handleTabChange('monitors')}
          >
            Alert monitors
          </button>
          <button 
            className={`sub-nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabChange('reports')}
          >
            Reports
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'alerts' && (
          <div className="tab-content active">
            <AlertsSummary alertCounts={alertCounts} />
            <AlertsTable alertCounts={alertCounts} />
          </div>
        )}

        {activeTab === 'monitors' && (
          <div className="tab-content active">
            <div className="placeholder-content">
              <h3>Alert Monitors</h3>
              <p>Configure and manage alert monitoring rules and thresholds.</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="tab-content active">
            <div className="placeholder-content">
              <h3>Reports</h3>
              <p>View and generate monitoring and alert reports.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringDashboard;