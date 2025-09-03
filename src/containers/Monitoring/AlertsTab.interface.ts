import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsTabProps {
  className?: string;
}

export interface AlertsTabReturn {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  refetchAlertsData: () => void;
}