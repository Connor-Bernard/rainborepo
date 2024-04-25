import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function useOMDB(title) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const omdb = useMemo(() => axios.create({
        baseURL: 'http://www.omdbapi.com',
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
        params: {
            apikey: process.env.REACT_APP_OMDB_API_KEY,
        }
    }), []);

    useEffect(() => {
        setLoading(true);
        if (!title) {
            setLoading(false);
            return;
        }
        omdb.get('', {
            params: {
                t: title,
            }
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [omdb, title]);


    return { loading, data, error };
}
