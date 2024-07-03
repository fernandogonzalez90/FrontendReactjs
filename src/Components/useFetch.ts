import { useEffect, useState } from "react";
import authService from './AuthServices';
import axios from 'axios';

export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getApi().get<T>(endpoint);
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Ocurrió un error al obtener los datos');
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}