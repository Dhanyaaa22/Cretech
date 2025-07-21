import React from 'react';
import { useToast } from '../contexts/ToastContext';
import './Toast.css';

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      default:
        return 'fa-info-circle';
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <i className={`fas ${getIcon()}`}></i>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={hideToast}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Toast;