import axiosInstance from '@services/api';
import { BaseRequestParams, ApiResponseObject } from 'ks-common/interfaces';
import { MonitoringAlertsApiResponse, MonitorsResult } from './monitoring.interface';

export const MonitoringAPI = {
  getAllMonitors: (params: BaseRequestParams) => {
    const url = `monitors?orgId=${params.orgId}&projectId=${params.projectId}`;
    return axiosInstance.get<ApiResponseObject<MonitorsResult[]>>(url);
  },

  getAlertsData: (params: BaseRequestParams) => {
    const url = `monitoring/alerts?orgId=${params.orgId}&projectId=${params.projectId}`;
    return axiosInstance.get<MonitoringAlertsApiResponse>(url);
  },
};