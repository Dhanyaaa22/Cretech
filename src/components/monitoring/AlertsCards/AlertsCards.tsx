import { KSFlexBox } from 'ks-common';
import AlertsBySeverityCard from '../AlertsBySeverityCard/AlertsBySeverityCard';
import AlertsByTypeCard from '../AlertsByTypeCard/AlertsByTypeCard';
import { AlertsCardsProps } from './AlertsCards.interface';

export const AlertsCards: React.FC<AlertsCardsProps> = ({
  className,
}) => {
  return (
    <KSFlexBox
      flexDirection="column"
      className={`kms-gap-[10px] kms-md:kms-flex-row ${className || ''}`}
    >
      <KSFlexBox className="kms-gap-[10px] kms-md:kms-w-[62%]">
        <AlertsBySeverityCard />
      </KSFlexBox>
      <KSFlexBox className="kms-md:kms-w-[38%]">
        <AlertsByTypeCard />
      </KSFlexBox>
    </KSFlexBox>
  );
};

export default AlertsCards;