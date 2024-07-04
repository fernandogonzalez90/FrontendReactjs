// useApi.ts
import { useState } from 'react';
import authService from './AuthServices';
import axios from 'axios';

export function useApi<T = any>() {
    const [data, setData] = useState<T | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, body?: any) => {
        setLoading(true);
        try {
            let res;
            switch (method) {
                case 'get':
                    res = await authService.getApi().get(url);
                    break;
                case 'post':
                    res = await authService.getApi().post(url, body);
                    break;
                case 'put':
                    res = await authService.getApi().put(url, body);
                    break;
                case 'delete':
                    res = await authService.getApi().delete(url);
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

    const get = (url: string) => handleRequest('get', url);
    const post = (url: string, data: any) => handleRequest('post', url, data);
    const put = (url: string, data: any) => handleRequest('put', url, data);
    const del = (url: string) => handleRequest('delete', url);

    const fetch = async (url: string) => {
        setLoading(true);
        try {
            const result = await get(url);
            setData(result);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    return { get, post, put, del, fetch, data, response, error, loading, setData };
}