import axios from './axios';
import { AxiosRequestConfig } from 'axios';

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<unknown> | undefined) =>
    axios.get<T>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown> | undefined) =>
    axios.post<T>(url, data, config).then((res) => res.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown> | undefined) =>
    axios.patch<T>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown> | undefined) =>
    axios.put<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig<unknown> | undefined) =>
    axios.delete<T>(url, config).then((res) => res.data),
};

export default httpClient;
