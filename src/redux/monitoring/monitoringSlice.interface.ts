import { MonitorsResult, AlertsSummaryData } from "@services/monitoring/monitoring.interface";

export interface MonitoringState {
  alertsFilters: any;
  monitorsData: MonitorsResult[];
  monitorsLoading: boolean;
  monitorsTimestamp: string | null;
  loading: boolean;
  alertsSummaryData: AlertsSummaryData[];
  alertsLoading: boolean;
  filters?: any[];
}