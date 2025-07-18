import React, { useState, useEffect } from 'react';
import './AlertSeverityCard.css';

const AlertSeverityCard = ({ 
  severity = 'info', 
  title = '', 
  message = '', 
  customBgColor = null,
  onClose = null,
  autoClose = false,
  autoCloseDelay = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [bgColor, setBgColor] = useState('');

  // Define severity color mappings
  const severityColors = {
    success: '#d4edda',
    warning: '#fff3cd',
    error: '#f8d7da',
    info: '#d1ecf1',
    critical: '#f5c6cb'
  };

  // Effect to set background color based on severity or custom color
  useEffect(() => {
    if (customBgColor) {
      setBgColor(customBgColor);
    } else {
      setBgColor(severityColors[severity] || severityColors.info);
    }
  }, [severity, customBgColor]);

  // Effect to handle auto-close functionality
  useEffect(() => {
    if (autoClose && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const getSeverityIcon = () => {
    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ',
      critical: '🚨'
    };
    return icons[severity] || icons.info;
  };

  const getSeverityClass = () => {
    return `alert-severity-${severity}`;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`alert-severity-card ${getSeverityClass()}`}
      style={{ backgroundColor: bgColor }}
      role="alert"
      aria-live="polite"
    >
      <div className="alert-content">
        <div className="alert-icon">
          {getSeverityIcon()}
        </div>
        <div className="alert-text">
          {title && <h4 className="alert-title">{title}</h4>}
          {message && <p className="alert-message">{message}</p>}
        </div>
        {onClose && (
          <button 
            className="alert-close-btn"
            onClick={handleClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertSeverityCard;