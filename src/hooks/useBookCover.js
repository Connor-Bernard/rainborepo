import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function useBookCover({ title, author }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const bookCover = useMemo(() => axios.create({
        baseURL: 'http://bookcover.longitood.com/bookcover',
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    }), []);

    useEffect(() => {
        setLoading(true);
        if (!title) {
            setLoading(false);
            return;
        }
        bookCover.get('', {
            params: {
                book_title: title,
                author_name: author,
            }
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [title, author, bookCover]);

    return { loading, data, error };
}
