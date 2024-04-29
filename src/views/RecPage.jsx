import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilmRecPage from './FilmRecPage';
import BookRecPage from './BookRecPage';

export default function RecPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    if (searchParams.get('film')) {
        return (<FilmRecPage />);
    }

    if (searchParams.get('book') && searchParams.get('author')) {
        return (<BookRecPage />);
    }

    console.error('required query parameters were not included in request.');
    navigate('/');
}
