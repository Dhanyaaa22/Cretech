import { configureStore } from '@reduxjs/toolkit';
import monitoringReducer from './monitoring/monitoringSlice';

export const store = configureStore({
  reducer: {
    monitoring: monitoringReducer,
    // Add other reducers as needed
    mfeData: {} as any, // Placeholder for mfeData state
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ReducerAction<T> = {
  payload: T;
  type: string;
};