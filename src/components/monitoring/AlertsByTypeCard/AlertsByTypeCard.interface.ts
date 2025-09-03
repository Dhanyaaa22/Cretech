export interface AlertsByTypeCardProps {
  className?: string;
  handleViewClick?: (alertType: string) => void;
}

export enum ALERTS_TYPE_CARD_KEYS {
  SUBSCRIPTION_EXPIRATION = 'subscription_expiration_alerts',
  CAPACITY_USAGE = 'capacity_usage_alerts',
}