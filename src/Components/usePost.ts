// usePost.ts
import { useState } from 'react';
import authService from './AuthServices';
import axios from 'axios';

export function usePost() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (url: string, data: any) => {
    setLoading(true);
    try {
      const res = await authService.getApi().post(url, data);
      setResponse(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Ocurrió un error al enviar los datos');
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { post, response, error, loading };
}