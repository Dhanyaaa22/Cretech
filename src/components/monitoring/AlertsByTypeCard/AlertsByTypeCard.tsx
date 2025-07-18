import { useMemo } from 'react';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { CalendarIcon } from '@netapp/bxp-style/react-icons/General';
import { VolIcon } from '@netapp/bxp-style/react-icons/Storage';
import { CardLoader } from '@components/common';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { ADVANCE_FILTER_KEYS_MONITORING } from '@containers/Monitoring/MonitoringTabs/AlertsTab/AlertsTab.interface';
import { useMessageEvents } from '@hooks/messageEvents/useMessageEvents';
import { ROUTER_PATHS } from '@routes/routes.interface';

export const AlertsByTypeCard: React.FC = () => {
  const { loading, alertsSummaryData } = useAppSelector(
    (state) => state.monitoring
  );

  const dispatch = useAppDispatch();
  const { triggerEvent } = useMessageEvents();

  const { subscriptionExpiration, capacityUsage } = useMemo(() => {
    const summary = Array.isArray(alertsSummaryData)
      ? alertsSummaryData[0] || {}
      : alertsSummaryData || {};

    const subscriptionExpiration =
      summary.subscription_expiration_alerts?.length || 0;
    const capacityUsage = summary.capacity_usage_alerts?.length || 0;

    return {
      subscriptionExpiration: subscriptionExpiration,
      capacityUsage: capacityUsage,
    };
  }, [alertsSummaryData]);

  const handleViewClick = (label: string, value: string) => {
    dispatch(
      MonitoringActions.setAlertsFilters([
        {
          id: ADVANCE_FILTER_KEYS_MONITORING.CARD_FILTER,
          name: 'Card filter',
          data: { label, value },
          initiateClick: true,
        },
      ])
    );
    triggerEvent(ROUTER_PATHS.ALERTS, {
      tabPath: ADVANCE_FILTER_KEYS_MONITORING.CARD_FILTER,
    });
  };

  const alertsItems: MetricItem[] = useMemo(
    () => [
      {
        id: ADVANCE_FILTER_KEYS_MONITORING.SUBSCRIPTION_EXPIRATION,
        label: t('keystone.labels.subscriptionExpiration'),
        value: subscriptionExpiration,
        Icon: CalendarIcon,
        iconBgColor: 'i8',
        isButtonDisabled: subscriptionExpiration === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.subscriptionExpiration'),
            ADVANCE_FILTER_KEYS_MONITORING.SUBSCRIPTION_EXPIRATION
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_MONITORING.CAPACITY_USAGE,
        label: t('keystone.labels.capacityUsage'),
        value: capacityUsage,
        Icon: VolIcon,
        iconBgColor: 'i10',
        isButtonDisabled: capacityUsage === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.capacityUsage'),
            ADVANCE_FILTER_KEYS_MONITORING.CAPACITY_USAGE
          ),
      },
    ],
    [subscriptionExpiration, capacityUsage]
  );

  if (loading) {
    return <CardLoader />;
  }
  
  return (
    <KSMetricCard
      className="kms-w-[656px] kms-h-[190px]"
      title={t('keystone.headers.unresolvedAlertsByType')}
      metricItems={alertsItems}
      isThin
    />
  );
};

export default AlertsByTypeCard;