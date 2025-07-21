import React from 'react';
import { useToast } from '../contexts/ToastContext';
import './AlertsSummary.css';

const AlertsSummary = ({ alertCounts }) => {
  const { showToast } = useToast();

  const handleViewClick = (alertType) => {
    showToast(`Showing alerts for: ${alertType}`);
  };

  return (
    <div className="alert-summary">
      <div className="summary-section">
        <h3>Unresolved alerts by severity</h3>
        <div className="severity-cards">
          <div className="alert-card critical">
            <div className="alert-icon">
              <i className="fas fa-times-circle"></i>
            </div>
            <div className="alert-info">
              <span className="alert-count">{alertCounts.severity.critical}</span>
              <span className="alert-label">Critical</span>
              <button 
                className="view-link"
                onClick={() => handleViewClick('Critical')}
              >
                View
              </button>
            </div>
          </div>
          
          <div className="alert-card warning">
            <div className="alert-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="alert-info">
              <span className="alert-count">{alertCounts.severity.warning}</span>
              <span className="alert-label">Warning</span>
              <button 
                className="view-link"
                onClick={() => handleViewClick('Warning')}
              >
                View
              </button>
            </div>
          </div>
          
          <div className="alert-card informational">
            <div className="alert-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="alert-info">
              <span className="alert-count">{alertCounts.severity.informational}</span>
              <span className="alert-label">Informational</span>
              <button 
                className="view-link"
                onClick={() => handleViewClick('Informational')}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h3>Unresolved alerts by type</h3>
        <div className="type-cards">
          <div className="alert-card subscription">
            <div className="alert-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="alert-info">
              <span className="alert-count">{alertCounts.type.subscription}</span>
              <span className="alert-label">Subscription expiration</span>
              <button 
                className="view-link"
                onClick={() => handleViewClick('Subscription expiration')}
              >
                View
              </button>
            </div>
          </div>
          
          <div className="alert-card capacity">
            <div className="alert-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className="alert-info">
              <span className="alert-count">{alertCounts.type.capacity}</span>
              <span className="alert-label">Capacity usage</span>
              <button 
                className="view-link"
                onClick={() => handleViewClick('Capacity usage')}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsSummary;