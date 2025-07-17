import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsBySeverityCardProps {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  className?: string;
}