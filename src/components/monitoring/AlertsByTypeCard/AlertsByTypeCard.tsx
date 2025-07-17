import { useMemo } from 'react';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { CardLoader } from '@components/common';
import { AlertsByTypeCardProps } from './AlertsByTypeCard.interface';

export const AlertsByTypeCard: React.FC<AlertsByTypeCardProps> = ({
  alertsSummaryData,
  alertsLoading,
  className,
}) => {
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
        id: 'subscription_expiration_alerts',
        label: t('keystone.labels.subscriptionExpiration'),
        value: subscriptionExpirationAlerts,
        iconBgColor: 'i7',
        isButtonDisabled: subscriptionExpirationAlerts === 0,
      },
      {
        id: 'capacity_usage_alerts',
        label: t('keystone.labels.capacityUsage'),
        value: capacityUsageAlerts,
        iconBgColor: 'i3',
        isButtonDisabled: capacityUsageAlerts === 0,
      },
    ],
    [alertsSummaryData]
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