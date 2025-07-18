import { useMemo } from 'react';
import { ErrorIcon, InfoIcon, NoticeTriangleIcon } from "@netapp/bxp-style/react-icons/Notification";
import { KSMetricCard, MetricItem } from 'ks-common';
import { t } from 'ks-common/locales';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { CardLoader } from '@components/common';
import { MonitoringActions } from '@redux/monitoring/monitoringSlice';
import { ADVANCE_FILTER_KEYS_MONITORING } from '@containers/Monitoring/MonitoringTabs/AlertsTab/AlertsTab.interface';
import { useMessageEvents } from '@hooks/messageEvents/useMessageEvents';
import { ROUTER_PATHS } from '@routes/routes.interface';

export const AlertsBySeverityCard: React.FC = () => {
  const { alertsSummaryData, alertsLoading } = useAppSelector(
    (state) => state.monitoring
  );

  const dispatch = useAppDispatch();
  const { triggerEvent } = useMessageEvents();

  const { critical, warning, informational } = useMemo(() => {
    const summary = Array.isArray(alertsSummaryData)
      ? alertsSummaryData[0] || {}
      : alertsSummaryData || {};

    const critical = summary.critical_alerts?.length || 0;
    const warning = summary.warning_alerts?.length || 0;
    const informational = summary.informational_alerts?.length || 0;

    return {
      critical,
      warning,
      informational,
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
        id: ADVANCE_FILTER_KEYS_MONITORING.CRITICAL,
        label: t('keystone.labels.critical'),
        value: critical,
        Icon: () => <ErrorIcon className="kms-w-9 kms-h-9" color="error" />,
        bgColor: 'var(--notification-critical-bg)',
        isButtonDisabled: critical === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.critical'),
            ADVANCE_FILTER_KEYS_MONITORING.CRITICAL
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_MONITORING.WARNING,
        label: t('keystone.labels.warning'),
        value: warning,
        Icon: () => <InfoIcon className="kms-w-9 kms-h-9" color="warning" />,
        bgColor: 'var(--notification-warning-bg)',
        isButtonDisabled: warning === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.warning'),
            ADVANCE_FILTER_KEYS_MONITORING.WARNING
          ),
      },
      {
        id: ADVANCE_FILTER_KEYS_MONITORING.INFORMATIONAL,
        label: t('keystone.labels.informational'),
        value: informational,
        Icon: () => (
          <NoticeTriangleIcon className="kms-w-9 kms-h-9" color="information" />
        ),
        bgColor: 'var(--notification-information-bg)',
        isButtonDisabled: informational === 0,
        onViewClick: () =>
          handleViewClick(
            t('keystone.labels.informational'),
            ADVANCE_FILTER_KEYS_MONITORING.INFORMATIONAL
          ),
      },
    ],
    [critical, warning, informational]
  );

  if (alertsLoading) {
    return <CardLoader />;
  }

  return (
    <KSMetricCard
      className="kms-w-[928px] kms-h-[190px]"
      title={t('keystone.headers.unresolvedAlertsBySeverity')}
      metricItems={alertsItems}
      metricItemClassName="kms-text-[26px]"
      isThin
    />
  );
};

export default AlertsBySeverityCard;