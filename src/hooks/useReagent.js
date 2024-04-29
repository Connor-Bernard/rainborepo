import { useCallback, useMemo } from 'react';
import axios from 'axios';

export default function useReagent({ nogginId, apiKey }) {
    const noggin = useMemo(() => axios.create({
        baseURL: `https://noggin.rea.gent/${nogginId}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            Authorization: `Bearer ${apiKey}`,
        }
    }), [nogginId, apiKey]);

    noggin.interceptors.response.use((res) => {
        if (res.data === null || res.data?.title === null || res.data?.author === null) {
            return Promise.reject({ ...res, status: 400 });
        }
        return res;
    });

    return useCallback((params = {}) => noggin.post('', params), [noggin]);
}
