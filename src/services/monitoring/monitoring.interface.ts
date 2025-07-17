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
  severity: AlertSeverity;
  type: AlertType;
  timestamp: string;
  source: string;
  status: AlertStatus;
}

export enum AlertSeverity {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFORMATIONAL = 'informational'
}

export enum AlertType {
  SUBSCRIPTION_EXPIRATION = 'subscription_expiration',
  CAPACITY_USAGE = 'capacity_usage',
  SYSTEM = 'system',
  NETWORK = 'network',
  PERFORMANCE = 'performance'
}

export enum AlertStatus {
  ACTIVE = 'active',
  RESOLVED = 'resolved',
  ACKNOWLEDGED = 'acknowledged'
}

export interface MonitoringApiResponse {
  alerts_summary: AlertsSummaryData;
  total_alerts: number;
  unresolved_alerts: number;
}