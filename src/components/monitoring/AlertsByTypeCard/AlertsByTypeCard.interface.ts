import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsByTypeCardProps {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  className?: string;
}