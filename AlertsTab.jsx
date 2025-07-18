import React, { useState, useMemo } from 'react';
import { useAlertsData } from './AlertsDataFetcher';
import './AlertsTab.css';

const AlertsTab = () => {
  const {
    alerts,
    loading,
    error,
    lastUpdated,
    markAlertAsRead,
    deleteAlert,
    refreshAlerts,
    getUnreadCount
  } = useAlertsData();

  const [filters, setFilters] = useState({
    severity: '',
    priority: '',
    isRead: '',
    source: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc'
  });

  // Filter and sort alerts
  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = alerts.filter(alert => {
      if (filters.severity && alert.severity !== filters.severity) return false;
      if (filters.priority && alert.priority !== filters.priority) return false;
      if (filters.isRead !== '' && alert.isRead !== (filters.isRead === 'true')) return false;
      if (filters.source && !alert.source.toLowerCase().includes(filters.source.toLowerCase())) return false;
      return true;
    });

    // Sort alerts
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'timestamp') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [alerts, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      severity: '',
      priority: '',
      isRead: '',
      source: ''
    });
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

  const getSeverityBadge = (severity) => {
    const badgeClasses = {
      critical: 'severity-badge critical',
      error: 'severity-badge error',
      warning: 'severity-badge warning',
      success: 'severity-badge success',
      info: 'severity-badge info'
    };
    return badgeClasses[severity] || badgeClasses.info;
  };

  const getPriorityBadge = (priority) => {
    const badgeClasses = {
      high: 'priority-badge high',
      medium: 'priority-badge medium',
      low: 'priority-badge low'
    };
    return badgeClasses[priority] || badgeClasses.low;
  };

  if (loading) {
    return (
      <div className="alerts-tab">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerts-tab">
        <div className="error-message">
          <h3>Error Loading Alerts</h3>
          <p>{error}</p>
          <button onClick={refreshAlerts} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts-tab">
      <div className="alerts-header">
        <div className="header-left">
          <h2>Alerts Dashboard</h2>
          <div className="alerts-stats">
            <span className="stat">
              Total: <strong>{alerts.length}</strong>
            </span>
            <span className="stat unread">
              Unread: <strong>{getUnreadCount()}</strong>
            </span>
            {lastUpdated && (
              <span className="stat">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="header-right">
          <button onClick={refreshAlerts} className="btn btn-secondary">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="alerts-filters">
        <div className="filter-group">
          <label>Severity:</label>
          <select
            value={filters.severity}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
          >
            <option value="">All</option>
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="info">Info</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.isRead}
            onChange={(e) => handleFilterChange('isRead', e.target.value)}
          >
            <option value="">All</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Source:</label>
          <input
            type="text"
            placeholder="Filter by source..."
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
          />
        </div>

        <button onClick={clearFilters} className="btn btn-link">
          Clear Filters
        </button>
      </div>

      <div className="alerts-table-container">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Status</th>
              <th 
                className={`sortable ${sortConfig.key === 'severity' ? sortConfig.direction : ''}`}
                onClick={() => handleSort('severity')}
              >
                Severity ↕
              </th>
              <th 
                className={`sortable ${sortConfig.key === 'title' ? sortConfig.direction : ''}`}
                onClick={() => handleSort('title')}
              >
                Title ↕
              </th>
              <th>Message</th>
              <th 
                className={`sortable ${sortConfig.key === 'source' ? sortConfig.direction : ''}`}
                onClick={() => handleSort('source')}
              >
                Source ↕
              </th>
              <th 
                className={`sortable ${sortConfig.key === 'priority' ? sortConfig.direction : ''}`}
                onClick={() => handleSort('priority')}
              >
                Priority ↕
              </th>
              <th 
                className={`sortable ${sortConfig.key === 'timestamp' ? sortConfig.direction : ''}`}
                onClick={() => handleSort('timestamp')}
              >
                Time ↕
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAlerts.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-alerts">
                  No alerts match the current filters.
                </td>
              </tr>
            ) : (
              filteredAndSortedAlerts.map(alert => (
                <tr 
                  key={alert.id} 
                  className={`alert-row ${!alert.isRead ? 'unread' : ''}`}
                >
                  <td>
                    <div className={`status-indicator ${alert.isRead ? 'read' : 'unread'}`}>
                      {alert.isRead ? '✓' : '●'}
                    </div>
                  </td>
                  <td>
                    <span className={getSeverityBadge(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="alert-title">
                    {alert.title}
                  </td>
                  <td className="alert-message">
                    {alert.message}
                  </td>
                  <td className="alert-source">
                    {alert.source}
                  </td>
                  <td>
                    <span className={getPriorityBadge(alert.priority)}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="alert-timestamp">
                    {formatTimestamp(alert.timestamp)}
                  </td>
                  <td className="alert-actions">
                    {!alert.isRead && (
                      <button
                        onClick={() => markAlertAsRead(alert.id)}
                        className="btn btn-sm btn-outline"
                        title="Mark as read"
                      >
                        👁
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="btn btn-sm btn-danger"
                      title="Delete alert"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="alerts-summary">
        <p>
          Showing {filteredAndSortedAlerts.length} of {alerts.length} alerts
        </p>
      </div>
    </div>
  );
};

export default AlertsTab;