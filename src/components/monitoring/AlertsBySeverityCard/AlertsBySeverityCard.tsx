import { useMemo } from 'react';
import { NoticeTriangleIcon } from '@netapp/bxp-style/react-icons/Notification';
import { InformationIcon } from '@netapp/bxp-style/react-icons/Help';
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { CardLoader } from '@components/common';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { ADVANCE_FILTER_KEYS_ALERTS } from '@containers/Monitoring/constants';

export const AlertsBySeverityCard: React.FC = () => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const dispatch = useAppDispatch();

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

  const alertsBySeverityMetrics: MetricItem[] = useMemo(
    () => [
      {
        id: ADVANCE_FILTER_KEYS_ALERTS.CRITICAL_ALERTS,
        label: t('keystone.labels.criticalAlerts'),
        value: criticalAlerts,
        Icon: NoticeTriangleIcon,
        iconBgColor: 'i8',
        isButtonDisabled: criticalAlerts === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.criticalAlerts'),
            ADVANCE_FILTER_KEYS_ALERTS.CRITICAL_ALERTS
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_ALERTS.WARNING_ALERTS,
        label: t('keystone.labels.warningAlerts'),
        value: warningAlerts,
        Icon: NoticeTriangleIcon,
        iconBgColor: 'i6',
        isButtonDisabled: warningAlerts === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.warningAlerts'),
            ADVANCE_FILTER_KEYS_ALERTS.WARNING_ALERTS
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_ALERTS.INFORMATIONAL_ALERTS,
        label: t('keystone.labels.informationalAlerts'),
        value: informationalAlerts,
        Icon: InformationIcon,
        iconBgColor: 'i4',
        isButtonDisabled: informationalAlerts === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.informationalAlerts'),
            ADVANCE_FILTER_KEYS_ALERTS.INFORMATIONAL_ALERTS
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
      title={t('keystone.headers.unresolvedAlertsBySeverity')}
      metricItems={alertsBySeverityMetrics}
      isThin
    />
  );
};

export default AlertsBySeverityCard;