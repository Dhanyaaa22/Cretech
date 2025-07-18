import React, { useState } from 'react';
import AlertsTab from './AlertsTab';
import AlertsCardsView from './AlertsCardsView';
import './AlertsDashboard.css';

const AlertsDashboard = () => {
  const [activeView, setActiveView] = useState('cards'); // 'cards' or 'table'

  return (
    <div className="alerts-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🚨 Alerts Management System</h1>
          <p>Real-time alerts monitoring with multiple view options</p>
        </div>
        
        <div className="view-switcher">
          <button
            className={`view-btn ${activeView === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveView('cards')}
          >
            📱 Cards View
          </button>
          <button
            className={`view-btn ${activeView === 'table' ? 'active' : ''}`}
            onClick={() => setActiveView('table')}
          >
            📋 Table View
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeView === 'cards' ? (
          <AlertsCardsView />
        ) : (
          <AlertsTab />
        )}
      </div>

      <div className="dashboard-footer">
        <div className="feature-highlights">
          <h3>🎯 Key Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <div className="feature-text">
                <strong>Auto-Refresh</strong>
                <span>Real-time data updates every 30 seconds</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <div className="feature-text">
                <strong>Custom Backgrounds</strong>
                <span>Dynamic colors based on severity & custom options</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <strong>React Hooks</strong>
                <span>Modern hooks-based implementation throughout</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <div className="feature-text">
                <strong>Advanced Filtering</strong>
                <span>Filter by severity, priority, status, and source</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <strong>Multiple Views</strong>
                <span>Switch between cards and table layouts</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div className="feature-text">
                <strong>Responsive Design</strong>
                <span>Optimized for desktop, tablet, and mobile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="api-info">
          <h4>🔌 API Integration</h4>
          <div className="api-details">
            <div className="api-endpoint">
              <strong>Data Source:</strong> Mock API with realistic delay simulation
            </div>
            <div className="api-endpoint">
              <strong>Endpoints:</strong> fetchAlerts(), markAsRead(), deleteAlert()
            </div>
            <div className="api-endpoint">
              <strong>Features:</strong> Filtering, sorting, real-time updates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsDashboard;