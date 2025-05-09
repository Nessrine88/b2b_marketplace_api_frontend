import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(endpoint: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!endpoint) {
      setState({
        data: null,
        loading: false,
        error: new Error('Endpoint is not provided'),
      });
      return;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve Bearer token

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setState({
          data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('An unknown error occurred'),
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return state;
}
