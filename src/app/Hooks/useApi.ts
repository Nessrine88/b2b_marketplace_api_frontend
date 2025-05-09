import { useState } from 'react';

type UseApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

export function useApi<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (endpoint: string, options?: UseApiOptions) => {
    setLoading(true);
    setError(null);
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
console.log(apiUrl);

    try {
      const res = await fetch(apiUrl, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          
          ...(options?.headers || {}),
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const authHeader = res.headers.get('Authorization');
      const json = await res.json();
      setData(json);

      return { json, authHeader };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}
