import { useMemo } from 'react';
import { NoticeTriangleIcon } from '@netapp/bxp-style/react-icons/Notification';
import { InformationIcon } from '@netapp/bxp-style/react-icons/Help';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppSelector } from '@redux/hooks';
import { CardLoader } from '@components/common';
import { AlertsBySeverityCardProps, ALERTS_SEVERITY_CARD_KEYS } from './AlertsBySeverityCard.interface';

export const AlertsBySeverityCard: React.FC<AlertsBySeverityCardProps> = ({
  className,
}) => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const { criticalAlerts, warningAlerts, informationalAlerts } = useMemo(() => {
    const critical = alertsSummaryData?.critical_alerts?.length || 0;
    const warning = alertsSummaryData?.warning_alerts?.length || 0;
    const informational = alertsSummaryData?.informational_alerts?.length || 0;

    return {
      criticalAlerts: critical,
      warningAlerts: warning,
      informationalAlerts: informational,
    };
  }, [alertsSummaryData]);

  const alertsBySeverityMetrics: MetricItem[] = useMemo(
    () => [
      {
        id: ALERTS_SEVERITY_CARD_KEYS.CRITICAL_ALERTS,
        label: t('keystone.labels.criticalAlerts'),
        value: criticalAlerts,
        Icon: NoticeTriangleIcon,
        iconBgColor: 'i8',
        isButtonDisabled: criticalAlerts === 0,
      },
      {
        id: ALERTS_SEVERITY_CARD_KEYS.WARNING_ALERTS,
        label: t('keystone.labels.warningAlerts'),
        value: warningAlerts,
        Icon: NoticeTriangleIcon,
        iconBgColor: 'i6',
        isButtonDisabled: warningAlerts === 0,
      },
      {
        id: ALERTS_SEVERITY_CARD_KEYS.INFORMATIONAL_ALERTS,
        label: t('keystone.labels.informationalAlerts'),
        value: informationalAlerts,
        Icon: InformationIcon,
        iconBgColor: 'i4',
        isButtonDisabled: informationalAlerts === 0,
      },
    ],
    [criticalAlerts, warningAlerts, informationalAlerts]
  );

  if (alertsLoading) {
    return <CardLoader />;
  }

  return (
    <KSMetricCard
      className={`kms-grow ${className || ''}`}
      title={t('keystone.headers.unresolvedAlertsBySeverity')}
      metricItems={alertsBySeverityMetrics}
      isThin
    />
  );
};

export default AlertsBySeverityCard;