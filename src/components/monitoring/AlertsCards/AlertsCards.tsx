import { KSFlexBox } from 'ks-common';
import AlertsBySeverityCard from '../AlertsBySeverityCard/AlertsBySeverityCard';
import AlertsByTypeCard from '../AlertsByTypeCard/AlertsByTypeCard';

export const AlertsCards: React.FC = () => {
  return (
    <KSFlexBox
      flexDirection="column"
      className="kms-gap-[10px] kms-md:kms-flex-row"
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