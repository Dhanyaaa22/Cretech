import { MonitorsResult, AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface MonitoringState {
  monitorsData: MonitorsResult[];
  monitorsLoading: boolean;
  monitorsTimestamp: string | null;
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
}