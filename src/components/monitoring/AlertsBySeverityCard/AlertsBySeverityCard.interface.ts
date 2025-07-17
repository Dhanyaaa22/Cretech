import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsBySeverityCardProps {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  className?: string;
}

export enum ALERTS_SEVERITY_CARD_KEYS {
  CRITICAL_ALERTS = 'critical_alerts',
  WARNING_ALERTS = 'warning_alerts',
  INFORMATIONAL_ALERTS = 'informational_alerts',
}