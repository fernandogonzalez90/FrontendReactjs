import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import authService from './AuthServices';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = authService.getCurrentUser();
    if (user && user.access) {
      config.headers['Authorization'] = 'Bearer ' + user.access;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await authService.refreshToken();
        if (newToken) {
          error.config.headers['Authorization'] = 'Bearer ' + newToken;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        authService.logout();
        // Redirigir al login
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;