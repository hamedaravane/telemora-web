import axios from 'axios';
import { environment } from '@environments';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const telegramInitData = localStorage.getItem('telegram-init-data');
    if (telegramInitData) {
      config.headers['x-telegram-init-data'] = telegramInitData;
    }
  }
  return config;
});

export default axiosInstance;
