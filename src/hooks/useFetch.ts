

import { axiosInstance } from '@/shared/api';
import { useEffect, useState, useCallback } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
    fetchData: () => void; 
}

export function useFetch<T = any>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        axiosInstance
            .get<T>(url)
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                setError(err?.response?.data?.message || 'Xatolik yuz berdi');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    useEffect(() => {
        fetchData(); // 👈 автоматический вызов при первом рендере
    }, [fetchData]);

    return { data, error, loading, fetchData };
}
