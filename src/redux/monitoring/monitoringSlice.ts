import { createSlice } from '@reduxjs/toolkit';
import { ReducerAction } from '@redux/store';
import { MonitorsResult, AlertsSummaryData } from '@services/monitoring/monitoring.interface';
import { MonitoringState } from './monitoringSlice.interface';

const initialState: MonitoringState = {
  monitorsTimestamp: null,
  monitorsLoading: false,
  monitorsData: [],
  alertsSummaryData: null,
  alertsLoading: false,
};

const monitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    resetState: () => initialState,
    setMonitorsData: (
      state: MonitoringState,
      action: ReducerAction<MonitorsResult[]>
    ) => {
      state.monitorsData = action.payload;
    },
    setMonitorsLoading: (
      state: MonitoringState,
      action: ReducerAction<boolean>
    ) => {
      state.monitorsLoading = action.payload;
    },
    setMonitorsTimestamp: (
      state: MonitoringState,
      action: ReducerAction<string>
    ) => {
      state.monitorsTimestamp = action.payload;
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