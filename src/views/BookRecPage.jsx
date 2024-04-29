import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sanitize } from 'dompurify';
import { useSearchParams } from 'react-router-dom';
import useOpenLibrary from '../hooks/useOpenLibrary';
import useReagent from '../hooks/useReagent';
import styles from './style/RecPage.module.css';
import classname from 'classnames';

export default function MovieRecPage() {
    const [loadingAiRecommendation, setLoadingAiRecommendation] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const [title, author] = useMemo(() => {
        const bookTitle = sanitize(searchParams.get('book'));
        const author = sanitize(searchParams.get('author'));
        return [bookTitle, author];
    }, [searchParams]);

    const bookInfo = useOpenLibrary({
        stub: 'search.json',
        params: { title, limit: 1, fields: 'cover_edition_key,ratings_average' },
    });

    useEffect(() => {
        if (bookInfo.error) {
            navigate('/');
        }
    }, [bookInfo.error, navigate]);

    const postNoggin = useReagent({
        nogginId: 'written-haddock-8647',
        apiKey: process.env.REACT_APP_BOOK_RECOMMENDATION_PAGE_NOGGIN_API_KEY,
    });

    useEffect(() => {
        if (!title) {
            return;
        }
        setLoadingAiRecommendation(true);
        postNoggin({ title, author }).then((res) => {
            setAiRecommendation(res.data);
            setLoadingAiRecommendation(false);
        }).catch((err) => {
            if (err.status === 400) {
                console.error('Could not generate review for specified book.');
            }
        });
    }, [author, title, postNoggin]);

    if (loadingAiRecommendation || bookInfo.loading) {
        // TODO: return the code for a loader here.
    }

    return (
        <div>
            <div className={classname(styles.taskHeader)}>
                <div>
                    <Link to="/" className={classname(styles.button)} id={styles.homeButton}>Home</Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`./images/rainborepo-colored.png`}
                        alt="Logo" style={{ width: '100px', height: '100px', marginRight: '10px', verticalAlign: 'middle' }}
                    />
                    <h1 style={{ margin: '0', verticalAlign: 'middle', lineHeight: '1' }}>rainborepo</h1>
                </div>
            </div>

            <div className={classname(styles.container)}>
                {bookInfo?.data &&
                    <div className={classname(styles.thumbnail)}>
                        <img
                            src={`https://covers.openlibrary.org/b/olid/${bookInfo.data?.docs[0]?.cover_edition_key}-L.jpg`}
                            alt="Book Cover"
                            className={classname(styles.moviePoster)}
                        />
                    </div>
                }
                <div className={classname(styles.movieDetails)}>
                    <h2 id="movie-name">{title}</h2>
                    <p id="movie-description">
                        {aiRecommendation &&
                            <>
                                <br />
                                <strong>AI Generated Recommendation: </strong>
                                {aiRecommendation}
                                <br />
                            </>
                        }
                    </p>
                    {bookInfo?.data?.docs[0]?.ratings_average &&
                        <div id="star-rating" className={classname(styles.starRating)}>
                            {bookInfo.data.docs[0].ratings_average.toFixed(2)}/5
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
