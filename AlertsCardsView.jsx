import React, { useState, useMemo } from 'react';
import { useAlertsData } from './AlertsDataFetcher';
import AlertSeverityCard from './AlertSeverityCard';
import './AlertsCardsView.css';

const AlertsCardsView = () => {
  const {
    alerts,
    loading,
    error,
    lastUpdated,
    markAlertAsRead,
    deleteAlert,
    refreshAlerts,
    getUnreadCount,
    getAlertsBySeverity
  } = useAlertsData();

  const [viewMode, setViewMode] = useState('all'); // 'all', 'unread', 'by-severity'
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [sortBy, setSortBy] = useState('timestamp'); // 'timestamp', 'severity', 'priority'
  const [gridSize, setGridSize] = useState('medium'); // 'small', 'medium', 'large'

  // Filter and sort alerts for card view
  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Apply view mode filters
    if (viewMode === 'unread') {
      filtered = filtered.filter(alert => !alert.isRead);
    } else if (viewMode === 'by-severity' && selectedSeverity) {
      filtered = filtered.filter(alert => alert.severity === selectedSeverity);
    }

    // Sort alerts
    filtered.sort((a, b) => {
      if (sortBy === 'timestamp') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortBy === 'severity') {
        const severityOrder = { critical: 5, error: 4, warning: 3, info: 2, success: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return filtered;
  }, [alerts, viewMode, selectedSeverity, sortBy]);

  const handleAlertClose = (alertId) => {
    deleteAlert(alertId);
  };

  const handleAlertClick = (alertId) => {
    markAlertAsRead(alertId);
  };

  const getSeverityStats = () => {
    return {
      critical: getAlertsBySeverity('critical').length,
      error: getAlertsBySeverity('error').length,
      warning: getAlertsBySeverity('warning').length,
      success: getAlertsBySeverity('success').length,
      info: getAlertsBySeverity('info').length
    };
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return alertTime.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="alerts-cards-view">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerts-cards-view">
        <div className="error-container">
          <h3>Error Loading Alerts</h3>
          <p>{error}</p>
          <button onClick={refreshAlerts} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const severityStats = getSeverityStats();

  return (
    <div className="alerts-cards-view">
      {/* Header */}
      <div className="cards-header">
        <div className="header-content">
          <h2>Alerts Cards View</h2>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{alerts.length}</span>
            </div>
            <div className="stat-item unread">
              <span className="stat-label">Unread:</span>
              <span className="stat-value">{getUnreadCount()}</span>
            </div>
            {lastUpdated && (
              <div className="stat-item">
                <span className="stat-label">Updated:</span>
                <span className="stat-value">{lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
        <button onClick={refreshAlerts} className="btn btn-secondary">
          🔄 Refresh
        </button>
      </div>

      {/* Severity Overview */}
      <div className="severity-overview">
        <h3>Severity Overview</h3>
        <div className="severity-cards">
          {Object.entries(severityStats).map(([severity, count]) => (
            <div 
              key={severity}
              className={`severity-stat ${severity} ${selectedSeverity === severity ? 'active' : ''}`}
              onClick={() => {
                setViewMode('by-severity');
                setSelectedSeverity(selectedSeverity === severity ? '' : severity);
              }}
            >
              <div className="severity-icon">
                {severity === 'critical' && '🚨'}
                {severity === 'error' && '❌'}
                {severity === 'warning' && '⚠️'}
                {severity === 'success' && '✅'}
                {severity === 'info' && 'ℹ️'}
              </div>
              <div className="severity-info">
                <span className="severity-name">{severity.toUpperCase()}</span>
                <span className="severity-count">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="cards-controls">
        <div className="view-controls">
          <label>View:</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="all">All Alerts</option>
            <option value="unread">Unread Only</option>
            <option value="by-severity">By Severity</option>
          </select>

          {viewMode === 'by-severity' && (
            <select 
              value={selectedSeverity} 
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="">Select Severity</option>
              <option value="critical">Critical</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
          )}
        </div>

        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="timestamp">Time</option>
            <option value="severity">Severity</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="grid-controls">
          <label>Grid size:</label>
          <select value={gridSize} onChange={(e) => setGridSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`cards-grid ${gridSize}`}>
        {filteredAndSortedAlerts.length === 0 ? (
          <div className="no-alerts-message">
            <h4>No alerts to display</h4>
            <p>
              {viewMode === 'unread' 
                ? 'All alerts have been read!' 
                : viewMode === 'by-severity' 
                ? `No ${selectedSeverity} alerts found.`
                : 'No alerts available.'}
            </p>
          </div>
        ) : (
          filteredAndSortedAlerts.map(alert => (
            <div key={alert.id} className="card-wrapper">
              <AlertSeverityCard
                severity={alert.severity}
                title={alert.title}
                message={alert.message}
                onClose={() => handleAlertClose(alert.id)}
                customBgColor={!alert.isRead ? undefined : '#f8f9fa'}
              />
              <div className="card-metadata">
                <div className="metadata-row">
                  <span className="metadata-label">Source:</span>
                  <span className="metadata-value">{alert.source}</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Priority:</span>
                  <span className={`priority-badge ${alert.priority}`}>
                    {alert.priority.toUpperCase()}
                  </span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Time:</span>
                  <span className="metadata-value">{formatTimestamp(alert.timestamp)}</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Status:</span>
                  <span className={`status-badge ${alert.isRead ? 'read' : 'unread'}`}>
                    {alert.isRead ? 'READ' : 'UNREAD'}
                  </span>
                </div>
              </div>
              {!alert.isRead && (
                <button
                  className="mark-read-btn"
                  onClick={() => handleAlertClick(alert.id)}
                  title="Mark as read"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {filteredAndSortedAlerts.length > 0 && (
        <div className="cards-summary">
          <p>
            Showing {filteredAndSortedAlerts.length} of {alerts.length} alerts
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertsCardsView;