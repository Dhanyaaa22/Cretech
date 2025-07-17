import { SelectedFilters } from 'ks-common';
import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';

export interface MonitoringState {
  filters: SelectedFilters[];
  alertsSummaryData: AlertsSummaryData | null;
  alertsLoading: boolean;
}

export interface FilteredAlertsData {
  filteredAlerts: any[];
  totalCount: number;
}