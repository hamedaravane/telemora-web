import axios from 'axios';
import { retrieveRawInitData } from '@telegram-apps/sdk-react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const rawInitData = retrieveRawInitData();
    if (rawInitData) {
      config.headers['Authorization'] = `tma ${rawInitData}`;
    }
  }
  return config;
});

export default axiosInstance;
