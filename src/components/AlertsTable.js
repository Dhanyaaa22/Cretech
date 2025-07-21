import React, { useState, useMemo } from 'react';
import { alertsData, getSeverityIcon, getStatusIcon } from '../data/alertsData';
import { useToast } from '../contexts/ToastContext';
import './AlertsTable.css';

const AlertsTable = ({ alertCounts }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const { showToast } = useToast();

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return alertsData;

    return [...alertsData].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [sortColumn, sortDirection]);

  const getSortIcon = (column) => {
    if (sortColumn !== column) return 'fa-sort';
    return sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  const handleFilter = () => {
    showToast('Filter functionality will be implemented in a future version');
  };

  const handleExport = () => {
    const headers = ['Severity', 'Alert ID', 'Alert', 'Triggered Time', 'Subscription Number', 'Tracking ID', 'Performance Service Level', 'Status'];
    
    let csvContent = headers.join(',') + '\n';
    
    alertsData.forEach(alert => {
      const row = [
        alert.severity,
        alert.id,
        `"${alert.alert}"`,
        `"${alert.triggeredTime}"`,
        alert.subscriptionNumber,
        alert.trackingId,
        alert.performanceServiceLevel,
        alert.status
      ];
      csvContent += row.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alerts-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showToast('Alerts data exported successfully', 'success');
  };

  const handleAlertClick = (alert) => {
    showToast('Alert details view not implemented');
  };

  return (
    <div className="alerts-table-container">
      <div className="table-header">
        <h3>Alerts ({alertCounts.total})</h3>
        <div className="table-actions">
          <button className="filter-btn" onClick={handleFilter}>
            <i className="fas fa-search"></i>
          </button>
          <button className="export-btn" onClick={handleExport}>
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="alerts-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('severity')}>
                <span>Severity</span>
                <i className={`fas ${getSortIcon('severity')}`}></i>
              </th>
              <th onClick={() => handleSort('id')}>
                <span>Alert ID</span>
                <i className={`fas ${getSortIcon('id')}`}></i>
              </th>
              <th onClick={() => handleSort('alert')}>
                <span>Alert</span>
                <i className={`fas ${getSortIcon('alert')}`}></i>
              </th>
              <th onClick={() => handleSort('triggeredTime')}>
                <span>Triggered time</span>
                <i className={`fas ${getSortIcon('triggeredTime')}`}></i>
              </th>
              <th onClick={() => handleSort('subscriptionNumber')}>
                <span>Subscription number</span>
                <i className={`fas ${getSortIcon('subscriptionNumber')}`}></i>
              </th>
              <th onClick={() => handleSort('trackingId')}>
                <span>Tracking ID</span>
                <i className={`fas ${getSortIcon('trackingId')}`}></i>
              </th>
              <th onClick={() => handleSort('performanceServiceLevel')}>
                <span>Performance service levels</span>
                <i className={`fas ${getSortIcon('performanceServiceLevel')}`}></i>
              </th>
              <th onClick={() => handleSort('status')}>
                <span>Status</span>
                <i className={`fas ${getSortIcon('status')}`}></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((alert) => (
              <tr key={alert.id}>
                <td>
                  <span className={`severity-badge ${alert.severity.toLowerCase()}`}>
                    <i className={`fas ${getSeverityIcon(alert.severity)}`}></i>
                    {alert.severity}
                  </span>
                </td>
                <td>{alert.id}</td>
                <td>
                  <button 
                    className="alert-link"
                    onClick={() => handleAlertClick(alert)}
                  >
                    {alert.alert}
                  </button>
                </td>
                <td>{alert.triggeredTime}</td>
                <td>
                  <button 
                    className="alert-link"
                    onClick={() => handleAlertClick(alert)}
                  >
                    {alert.subscriptionNumber}
                  </button>
                </td>
                <td>{alert.trackingId}</td>
                <td>{alert.performanceServiceLevel}</td>
                <td>
                  <span className={`status-badge ${alert.status.toLowerCase()}`}>
                    <i className={`fas ${getStatusIcon(alert.status)}`}></i>
                    {alert.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="pagination-info">1 - {alertCounts.total} of {alertCounts.total}</span>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="page-number">1</span>
          <button className="pagination-btn" disabled>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsTable;