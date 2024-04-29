import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import isDeepEqual from 'fast-deep-equal';

export default function useOpenLibrary({ subdomain, stub, params }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const localParams = useRef(params);

    if (!isDeepEqual(localParams.current, params)) {
        localParams.current = params;
    }

    const openLibrary = useMemo(() => axios.create({
        baseURL: `https://${subdomain ? subdomain + '.' : ''}openlibrary.org`,
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    }), [subdomain]);

    useEffect(() => {
        setLoading(true);
        openLibrary.get(stub, {
            params: localParams.current,
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [openLibrary, stub]);

    return { loading, data, error };
}
