import { api } from '../api';
import { MonitoringApiResponse } from './monitoring.interface';

export const monitoringApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlertsData: builder.query<MonitoringApiResponse, void>({
      query: () => ({
        url: '/monitoring/alerts',
        method: 'GET',
      }),
      providesTags: ['Monitoring'],
    }),
  }),
});

export const { useGetAlertsDataQuery } = monitoringApi;