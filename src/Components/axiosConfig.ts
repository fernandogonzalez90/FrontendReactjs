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

export default axiosInstance;