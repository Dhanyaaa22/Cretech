import { useState, useEffect, useCallback } from 'react';

// Mock API service for alerts data
export const alertsAPI = {
  // Simulate fetching alerts from an API
  fetchAlerts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - in real app, this would come from your backend
    return {
      success: true,
      data: [
        {
          id: 1,
          severity: 'critical',
          title: 'System Outage',
          message: 'Main database server is experiencing connectivity issues.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          source: 'Infrastructure',
          isRead: false,
          priority: 'high'
        },
        {
          id: 2,
          severity: 'warning',
          title: 'High CPU Usage',
          message: 'Server CPU usage has exceeded 85% for the last 10 minutes.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          source: 'Monitoring',
          isRead: false,
          priority: 'medium'
        },
        {
          id: 3,
          severity: 'success',
          title: 'Backup Completed',
          message: 'Daily backup process completed successfully.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          source: 'Backup Service',
          isRead: true,
          priority: 'low'
        },
        {
          id: 4,
          severity: 'error',
          title: 'Payment Gateway Error',
          message: 'Payment processing service returned multiple 500 errors.',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          source: 'Payment System',
          isRead: false,
          priority: 'high'
        },
        {
          id: 5,
          severity: 'info',
          title: 'Maintenance Scheduled',
          message: 'Scheduled maintenance window for tomorrow 2-4 AM EST.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          source: 'System Admin',
          isRead: true,
          priority: 'low'
        },
        {
          id: 6,
          severity: 'warning',
          title: 'Storage Space Low',
          message: 'Primary storage partition is 92% full.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          source: 'Storage Monitor',
          isRead: false,
          priority: 'medium'
        }
      ]
    };
  },

  // Mark alert as read
  markAsRead: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },

  // Delete alert
  deleteAlert: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },

  // Fetch alerts with filters
  fetchAlertsWithFilters: async (filters = {}) => {
    const allAlerts = await alertsAPI.fetchAlerts();
    let filteredAlerts = allAlerts.data;

    if (filters.severity) {
      filteredAlerts = filteredAlerts.filter(alert => alert.severity === filters.severity);
    }

    if (filters.isRead !== undefined) {
      filteredAlerts = filteredAlerts.filter(alert => alert.isRead === filters.isRead);
    }

    if (filters.priority) {
      filteredAlerts = filteredAlerts.filter(alert => alert.priority === filters.priority);
    }

    if (filters.source) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.source.toLowerCase().includes(filters.source.toLowerCase())
      );
    }

    return {
      success: true,
      data: filteredAlerts
    };
  }
};

// Custom hook for managing alerts data
export const useAlertsData = (autoRefresh = true, refreshInterval = 30000) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAlerts = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = Object.keys(filters).length > 0 
        ? await alertsAPI.fetchAlertsWithFilters(filters)
        : await alertsAPI.fetchAlerts();
      
      if (response.success) {
        setAlerts(response.data);
        setLastUpdated(new Date());
      } else {
        throw new Error('Failed to fetch alerts');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAlertAsRead = useCallback(async (alertId) => {
    try {
      const response = await alertsAPI.markAsRead(alertId);
      if (response.success) {
        setAlerts(prevAlerts =>
          prevAlerts.map(alert =>
            alert.id === alertId ? { ...alert, isRead: true } : alert
          )
        );
      }
    } catch (err) {
      console.error('Error marking alert as read:', err);
    }
  }, []);

  const deleteAlert = useCallback(async (alertId) => {
    try {
      const response = await alertsAPI.deleteAlert(alertId);
      if (response.success) {
        setAlerts(prevAlerts =>
          prevAlerts.filter(alert => alert.id !== alertId)
        );
      }
    } catch (err) {
      console.error('Error deleting alert:', err);
    }
  }, []);

  const refreshAlerts = useCallback(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Initial fetch
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAlerts();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchAlerts]);

  // Get alerts by severity
  const getAlertsBySeverity = useCallback((severity) => {
    return alerts.filter(alert => alert.severity === severity);
  }, [alerts]);

  // Get unread alerts count
  const getUnreadCount = useCallback(() => {
    return alerts.filter(alert => !alert.isRead).length;
  }, [alerts]);

  // Get alerts by priority
  const getAlertsByPriority = useCallback((priority) => {
    return alerts.filter(alert => alert.priority === priority);
  }, [alerts]);

  return {
    alerts,
    loading,
    error,
    lastUpdated,
    fetchAlerts,
    markAlertAsRead,
    deleteAlert,
    refreshAlerts,
    getAlertsBySeverity,
    getUnreadCount,
    getAlertsByPriority
  };
};