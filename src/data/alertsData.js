export const alertsData = [
  {
    id: 1783,
    severity: 'Critical',
    alert: 'Capacity usage > 90%',
    triggeredTime: 'July 25, 2023, 9:44 AM',
    subscriptionNumber: '1789858600',
    trackingId: 'Honda-AHO',
    performanceServiceLevel: 'Extreme',
    status: 'Active'
  },
  {
    id: 1784,
    severity: 'Critical',
    alert: 'Capacity usage > 90%',
    triggeredTime: 'July 23, 2023, 4:56 AM',
    subscriptionNumber: '1951152300',
    trackingId: 'BMW-AHO',
    performanceServiceLevel: 'Standard',
    status: 'Resolved'
  },
  {
    id: 1785,
    severity: 'Warning',
    alert: 'Capacity usage > 80%',
    triggeredTime: 'July 22, 2023, 4:56 AM',
    subscriptionNumber: '1899053400',
    trackingId: 'Ferrari-AHO',
    performanceServiceLevel: 'Extreme',
    status: 'Active'
  },
  {
    id: 1786,
    severity: 'Critical',
    alert: 'Subscription expiry < 0 days',
    triggeredTime: 'July 22, 2023, 4:56 AM',
    subscriptionNumber: '1654987400',
    trackingId: 'Honda-AHO',
    performanceServiceLevel: '-',
    status: 'Active'
  },
  {
    id: 1794,
    severity: 'Critical',
    alert: 'Subscription expiry < 0 days',
    triggeredTime: 'July 22, 2023, 4:56 AM',
    subscriptionNumber: '1961039500',
    trackingId: 'Toyota-AHO',
    performanceServiceLevel: '-',
    status: 'Active'
  },
  {
    id: 1799,
    severity: 'Warning',
    alert: 'Subscription expiry < 30 days',
    triggeredTime: 'July 22, 2023, 4:56 AM',
    subscriptionNumber: '1961039501',
    trackingId: 'Honda-AHO',
    performanceServiceLevel: '-',
    status: 'Active'
  }
];

export const getAlertCounts = () => {
  const criticalCount = alertsData.filter(alert => alert.severity === 'Critical').length;
  const warningCount = alertsData.filter(alert => alert.severity === 'Warning').length;
  const informationalCount = alertsData.filter(alert => alert.severity === 'Informational').length;
  
  const capacityCount = alertsData.filter(alert => alert.alert.includes('Capacity')).length;
  const subscriptionCount = alertsData.filter(alert => alert.alert.includes('Subscription')).length;
  
  return {
    severity: {
      critical: criticalCount,
      warning: warningCount,
      informational: informationalCount
    },
    type: {
      capacity: capacityCount,
      subscription: subscriptionCount
    },
    total: alertsData.length
  };
};

export const getSeverityIcon = (severity) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'fa-times-circle';
    case 'warning':
      return 'fa-exclamation-triangle';
    case 'informational':
      return 'fa-info-circle';
    default:
      return 'fa-circle';
  }
};

export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'fa-bell';
    case 'resolved':
      return 'fa-check-circle';
    default:
      return 'fa-circle';
  }
};