// useApi.ts
import { useState } from 'react';
import authService from './AuthServices';
import axios, { AxiosRequestConfig } from 'axios';

interface ApiOptions extends AxiosRequestConfig {}

export function useApi<T = any>(defaultOptions: ApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, body?: any, options: ApiOptions = {}) => {
    setLoading(true);
    try {
      const api = authService.getApi();
      const config: AxiosRequestConfig = {
        ...defaultOptions,
        ...options,
      };

      let res;
      switch (method) {
        case 'get':
          res = await api.get(url, config);
          break;
        case 'post':
          res = await api.post(url, body, config);
          break;
        case 'put':
          res = await api.put(url, body, config);
          break;
        case 'delete':
          res = await api.delete(url, config);
          break;
      }
      setResponse(res.data);
      return res.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Ocurrió un error al procesar la solicitud');
      } else {
        setError('Ocurrió un error desconocido');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = (url: string, options?: ApiOptions) => handleRequest('get', url, undefined, options);
  const post = (url: string, data: any, options?: ApiOptions) => handleRequest('post', url, data, options);
  const put = (url: string, data: any, options?: ApiOptions) => handleRequest('put', url, data, options);
  const del = (url: string, options?: ApiOptions) => handleRequest('delete', url, undefined, options);

  const fetch = async (url: string, options?: ApiOptions) => {
    setLoading(true);
    try {
      const result = await get(url, options);
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return { get, post, put, del, fetch, data, response, error, loading, setData };
}