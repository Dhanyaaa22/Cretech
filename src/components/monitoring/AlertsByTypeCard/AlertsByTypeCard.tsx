import { useMemo } from 'react';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppSelector } from '@redux/hooks';
import { CardLoader } from '@components/common';
import { AlertsByTypeCardProps, ALERTS_TYPE_CARD_KEYS } from './AlertsByTypeCard.interface';

export const AlertsByTypeCard: React.FC<AlertsByTypeCardProps> = ({
  className,
  handleViewClick,
}) => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

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

  const alertsByTypeMetrics: MetricItem[] = useMemo(
    () => [
      {
        id: ALERTS_TYPE_CARD_KEYS.SUBSCRIPTION_EXPIRATION,
        label: t('keystone.labels.subscriptionExpiration'),
        value: subscriptionExpirationAlerts,
        iconBgColor: 'i7',
        isButtonDisabled: subscriptionExpirationAlerts === 0,
        onViewClick: handleViewClick ? () => handleViewClick(ALERTS_TYPE_CARD_KEYS.SUBSCRIPTION_EXPIRATION) : undefined,
      },
      {
        id: ALERTS_TYPE_CARD_KEYS.CAPACITY_USAGE,
        label: t('keystone.labels.capacityUsage'),
        value: capacityUsageAlerts,
        iconBgColor: 'i3',
        isButtonDisabled: capacityUsageAlerts === 0,
        onViewClick: handleViewClick ? () => handleViewClick(ALERTS_TYPE_CARD_KEYS.CAPACITY_USAGE) : undefined,
      },
    ],
    [subscriptionExpirationAlerts, capacityUsageAlerts, handleViewClick]
  );

  if (alertsLoading) {
    return <CardLoader />;
  }

  return (
    <KSMetricCard
      className={`kms-grow ${className || ''}`}
      title={t('keystone.headers.unresolvedAlertsByType')}
      metricItems={alertsByTypeMetrics}
      isThin
    />
  );
};

export default AlertsByTypeCard;