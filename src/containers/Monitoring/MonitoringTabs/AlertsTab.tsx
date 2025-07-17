import { useEffect, useMemo } from 'react';
import { AlertsCards } from '@components/monitoring';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { MonitoringAPI } from '@services/monitoring/monitoring.api';
import { KSFlexBox, ErrorIconType } from 'ks-common';
import { getApiErrorMessage } from 'ks-common/utils';
import { emitNotification } from '@redux/notification/notificationSlice';

export interface AlertsTabProps {
  className?: string;
}

export interface AlertsTabReturn {
  alertsSummaryData: any;
  alertsLoading: boolean;
  refetchAlertsData: () => void;
}

export const AlertsTab: React.FC<AlertsTabProps> = ({ className }) => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const { organizationId, scopeId } = useAppSelector((state) => state.mfeData);

  const dispatch = useAppDispatch();

  const fetchAlertsData = async () => {
    try {
      dispatch(MonitoringActions.setAlertsLoading(true));

      const alertsResponse = await MonitoringAPI.getAlertsData({
        orgId: organizationId,
        projectId: scopeId,
      });

      if (alertsResponse.status === 200) {
        dispatch(
          MonitoringActions.setAlertsSummaryData(alertsResponse.data.result.alerts_summary)
        );
      } else {
        dispatch(
          emitNotification({
            message: alertsResponse.data.status.user_message,
            type: ErrorIconType.Error,
          })
        );
      }
    } catch (error) {
      dispatch(
        emitNotification({
          message: getApiErrorMessage(error),
          type: ErrorIconType.Error,
        })
      );
    } finally {
      dispatch(MonitoringActions.setAlertsLoading(false));
    }
  };

  useEffect(() => {
    if (!alertsSummaryData) {
      fetchAlertsData();
    }
  }, [scopeId]);

  const alertsTabReturn: AlertsTabReturn = useMemo(
    () => ({
      alertsSummaryData,
      alertsLoading,
      refetchAlertsData: fetchAlertsData,
    }),
    [alertsSummaryData, alertsLoading]
  );

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