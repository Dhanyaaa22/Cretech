// Monitors interfaces
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

export enum MONITOR_SEVERITY {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFORMATIONAL = 'informational'
}

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

// Alert list item from API (as in result[])
export interface AlertListItem {
  alert_id: string;
  alert_name: string;
  severity: MONITOR_SEVERITY;
  monitor_id: string;
  monitor_name: string;
  condition: MonitorsCondition;
  subscriptions: string[];
  created_by: string;
  status: MONITOR_STATUS;
  created_at: string;
  updated_at: string;
}

// Alerts summary data structure (for result array)
export interface AlertsSummaryData {
  critical_alerts: AlertListItem[];
  warning_alerts: AlertListItem[];
  informational_alerts: AlertListItem[];
  subscription_expiration_alerts: AlertListItem[];
  capacity_usage_alerts: AlertListItem[];
}

// Alert summary as in summary{} - simplified structure for API response summary
export interface AlertsSummary {
  critical: { alert_id: string }[];
  warning: { alert_id: string }[];
  informational: { alert_id: string }[];
  subscription_expiration: { alert_id: string }[];
  capacity_usage: { alert_id: string }[];
}

// API response for GET /monitoring/alerts
export interface MonitoringAlertsApiResponse {
  status: {
    user_message: string;
    verbose_message: string;
    code: number;
  };
  result: AlertListItem[];
  summary: AlertsSummary;
}