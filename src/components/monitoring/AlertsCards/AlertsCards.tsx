import { KSFlexBox } from 'ks-common';
import AlertsBySeverityCard from '../AlertsBySeverityCard/AlertsBySeverityCard';
import AlertsByTypeCard from '../AlertsByTypeCard/AlertsByTypeCard';
import { AlertsCardsProps } from './AlertsCards.interface';

export const AlertsCards: React.FC<AlertsCardsProps> = ({
  severityCardProps,
  typeCardProps,
}) => {
  return (
    <KSFlexBox gap={6}>
      <AlertsBySeverityCard {...severityCardProps} />
      <AlertsByTypeCard {...typeCardProps} />
    </KSFlexBox>
  );
};

export default AlertsCards;