import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
