import AlertsCards from '@components/monitoring/AlertsCards/AlertsCards';
import { KSFlexBox } from 'ks-common';
import { AlertsTabProps } from './AlertsTab.interface';

export const AlertsTab: React.FC<AlertsTabProps> = (props) => {
  return (
    <KSFlexBox className="kms-mt-6">
      <AlertsCards {...props} />
    </KSFlexBox>
  );
};

export default AlertsTab;