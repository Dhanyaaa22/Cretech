import { SelectedFilters } from 'ks-common';
import { createSlice } from '@reduxjs/toolkit';
import { ReducerAction } from '@redux/store';
import { AlertsSummaryData } from '@services/monitoring/monitoring.interface';
import { MonitoringState } from './monitoringSlice.interface';

const initialState: MonitoringState = {
  filters: [],
  alertsSummaryData: null,
  alertsLoading: false,
};

const monitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    resetMonitoring: () => initialState,
    setFilters: (
      state: MonitoringState,
      action: ReducerAction<SelectedFilters[]>
    ) => {
      state.filters = action.payload;
    },
    setAlertsSummaryData: (
      state: MonitoringState,
      action: ReducerAction<AlertsSummaryData>
    ) => {
      state.alertsSummaryData = action.payload;
    },
    setAlertsLoading: (
      state: MonitoringState,
      action: ReducerAction<boolean>
    ) => {
      state.alertsLoading = action.payload;
    },
  },
});

export const MonitoringActions = monitoringSlice.actions;
export default monitoringSlice.reducer;