import AlertsBySeverityCard from '../AlertsBySeverityCard/AlertsBySeverityCard';
import AlertsByTypeCard from '../AlertsByTypeCard/AlertsByTypeCard';

export interface AlertsCardsProps {
  severityCardProps?: React.ComponentProps<typeof AlertsBySeverityCard>;
  typeCardProps?: React.ComponentProps<typeof AlertsByTypeCard>;
}