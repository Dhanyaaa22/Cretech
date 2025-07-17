import { ApiResponse, BaseRequestParams } from 'ks-common/interfaces';
import { MonitorsResult, MonitoringApiResponse } from './monitoring.interface';
import axiosInstance from '@services/api';

export const MonitoringAPI = {
  getAllMonitors: (params: BaseRequestParams) => {
    const url = `monitors?orgId=${params.orgId}&projectId=${params.projectId}`;
    return axiosInstance.get<ApiResponse<MonitorsResult>>(url);
  },
  
  getAlertsData: (params: BaseRequestParams) => {
    const url = `monitoring/alerts?orgId=${params.orgId}&projectId=${params.projectId}`;
    return axiosInstance.get<ApiResponse<MonitoringApiResponse>>(url);
  },
};