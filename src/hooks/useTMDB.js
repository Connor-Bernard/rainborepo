import { useCallback, useMemo } from 'react';
import axios from 'axios';

export default function useTmdb({ accessToken, tmdbMovieId }) {
    const tmdb = useMemo(() => axios.create({
        baseURL: `https://api.themoviedb.org/3/movie/${tmdbMovieId}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            Authorization: `Bearer ${accessToken}`,
        }
    }), [tmdbMovieId, accessToken]);

    return useCallback((stub, params = {}) => tmdb.get(stub, params), [tmdb]);
}
