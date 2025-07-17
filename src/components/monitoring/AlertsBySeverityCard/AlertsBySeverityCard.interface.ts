export interface AlertsBySeverityCardProps {
  className?: string;
  handleViewClick?: (alertType: string) => void;
}

export enum ALERTS_SEVERITY_CARD_KEYS {
  CRITICAL_ALERTS = 'critical_alerts',
  WARNING_ALERTS = 'warning_alerts',
  INFORMATIONAL_ALERTS = 'informational_alerts',
}