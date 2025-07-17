import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsCardsProps {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  className?: string;
}