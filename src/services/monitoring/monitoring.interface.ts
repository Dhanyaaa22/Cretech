// Existing monitors interfaces
export interface MonitorsResult {
  id: string;
  monitor_name: string;
  condition: MonitorsCondition;
  severity: MONITOR_SEVERITY;
  subscriptions: string[];
  performance_levels: string[];
  created_by: string;
  status: MONITOR_STATUS;
  alert_monitors_timestamp: string;
  last_update_timestamp: string;
}

// Monitor Severity Enum (for existing monitors)
export enum MONITOR_SEVERITY {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFORMATIONAL = 'informational'
}

// Monitor Status Enum (for existing monitors)
export enum MONITOR_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'disabled'
}

export interface MonitorsCondition {
  condition_type: string;
  equivalence: string;
  value: string;
}

// Alerts interfaces
export interface AlertsSummaryData {
  critical_alerts: Alert[];
  warning_alerts: Alert[];
  informational_alerts: Alert[];
  subscription_expiration_alerts: Alert[];
  capacity_usage_alerts: Alert[];
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: ALERT_SEVERITY;
  type: ALERT_TYPE;
  timestamp: string;
  source: string;
  status: ALERT_STATUS;
}

// Alert Severity Enum
export enum ALERT_SEVERITY {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFORMATIONAL = 'informational'
}

// Alert Type Enum
export enum ALERT_TYPE {
  SUBSCRIPTION_EXPIRATION = 'subscription_expiration',
  CAPACITY_USAGE = 'capacity_usage',
  SYSTEM = 'system',
  NETWORK = 'network',
  PERFORMANCE = 'performance'
}

// Alert Status Enum
export enum ALERT_STATUS {
  ACTIVE = 'active',
  RESOLVED = 'resolved',
  ACKNOWLEDGED = 'acknowledged'
}

export interface MonitoringApiResponse {
  alerts_summary: AlertsSummaryData;
  total_alerts: number;
  unresolved_alerts: number;
}