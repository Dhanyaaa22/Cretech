import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface AlertsByTypeCardProps {
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
  className?: string;
}

export enum ALERTS_TYPE_CARD_KEYS {
  SUBSCRIPTION_EXPIRATION = 'subscription_expiration_alerts',
  CAPACITY_USAGE = 'capacity_usage_alerts',
}