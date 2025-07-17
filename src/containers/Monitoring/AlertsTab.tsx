import { useEffect } from 'react';
import { AlertsCards } from '@components/monitoring';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { useGetAlertsDataQuery } from '@services/monitoring/monitoring.api';
import { KSFlexBox } from 'ks-common';
import { AlertsTabProps } from './AlertsTab.interface';

export const AlertsTab: React.FC<AlertsTabProps> = ({ className }) => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const dispatch = useAppDispatch();

  const {
    data: alertsData,
    isLoading,
    isError,
    refetch,
  } = useGetAlertsDataQuery();

  useEffect(() => {
    dispatch(MonitoringActions.setAlertsLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (alertsData?.alerts_summary) {
      dispatch(MonitoringActions.setAlertsSummaryData(alertsData.alerts_summary));
    }
  }, [alertsData, dispatch]);

  useEffect(() => {
    if (isError) {
      console.error('Failed to fetch alerts data');
    }
  }, [isError]);

  return (
    <KSFlexBox 
      flexDirection="column" 
      gap={6} 
      className={`kms-mt-6 ${className || ''}`}
    >
      <AlertsCards />
      {/* Future: Add AlertsTable component here */}
    </KSFlexBox>
  );
};

export default AlertsTab;