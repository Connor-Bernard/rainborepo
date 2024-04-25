import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import isDeepEqual from 'fast-deep-equal/react';

export default function useRapid({ service, endpoint, params } = { params: {} }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const localParams = useRef(params);
    if (!isDeepEqual(localParams.current, params)) {
        localParams.current = params;
    }
    const host = `${service}.p.rapidapi.com`;
    const rapid = useMemo(() => axios.create({
        baseURL: `https://${host}`,
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': host,
        }
    }), [host]);

    useEffect(() => {
        setLoading(true);
        rapid.get(endpoint, { params: localParams.current }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.debug('caught error', err);
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [rapid, endpoint]);

    return { loading, data, error };
}
