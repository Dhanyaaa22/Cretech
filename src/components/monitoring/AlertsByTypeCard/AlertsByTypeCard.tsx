import { useMemo } from 'react';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { CardLoader } from '@components/common';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { ADVANCE_FILTER_KEYS_ALERTS } from '@containers/Monitoring/constants';

export const AlertsByTypeCard: React.FC = () => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const dispatch = useAppDispatch();

  const { subscriptionExpirationAlerts, capacityUsageAlerts } = useMemo(() => {
    const subscriptionExpiration = 
      alertsSummaryData?.subscription_expiration_alerts?.length || 0;
    const capacityUsage = 
      alertsSummaryData?.capacity_usage_alerts?.length || 0;

    return {
      subscriptionExpirationAlerts: subscriptionExpiration,
      capacityUsageAlerts: capacityUsage,
    };
  }, [alertsSummaryData]);

  const handleViewClick = (label: string, value: string) => {
    dispatch(
      MonitoringActions.setFilters([
        {
          id: ADVANCE_FILTER_KEYS_ALERTS.CARD_FILTER,
          name: 'Card filter',
          data: { label, value },
          initiateClick: true,
        },
      ])
    );
  };

  const alertsByTypeMetrics: MetricItem[] = useMemo(
    () => [
      {
        id: ADVANCE_FILTER_KEYS_ALERTS.SUBSCRIPTION_EXPIRATION,
        label: t('keystone.labels.subscriptionExpiration'),
        value: subscriptionExpirationAlerts,
        iconBgColor: 'i7',
        isButtonDisabled: subscriptionExpirationAlerts === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.subscriptionExpiration'),
            ADVANCE_FILTER_KEYS_ALERTS.SUBSCRIPTION_EXPIRATION
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_ALERTS.CAPACITY_USAGE,
        label: t('keystone.labels.capacityUsage'),
        value: capacityUsageAlerts,
        iconBgColor: 'i3',
        isButtonDisabled: capacityUsageAlerts === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.capacityUsage'),
            ADVANCE_FILTER_KEYS_ALERTS.CAPACITY_USAGE
          ),
      },
    ],
    [alertsSummaryData]
  );

  if (alertsLoading) {
    return <CardLoader />;
  }

  return (
    <KSMetricCard
      className="kms-grow"
      title={t('keystone.headers.unresolvedAlertsByType')}
      metricItems={alertsByTypeMetrics}
      isThin
    />
  );
};

export default AlertsByTypeCard;