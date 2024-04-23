import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sanitize } from 'dompurify';
import { useSearchParams } from 'react-router-dom';
import useOMDB from '../hooks/useOMDB';
import useReagent from '../hooks/useReagent';
import './style/RecPage.css';

export default function RecPage() {
    const [loadingAiRecommendation, setLoadingAiRecommendation] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const filmName = useMemo(() => {
        return sanitize(searchParams.get('rec'));
    }, [searchParams]);

    const postNoggin = useReagent({
        nogginId: 'obedient-lamprey-8688',
        apiKey: process.env.REACT_APP_RECOMMENDATION_PAGE_NOGGIN_API_KEY,
    });

    useEffect(() => {
        if (!filmName) {
            return;
        }
        setLoadingAiRecommendation(true);
        postNoggin({ filmName }).then((res) => {
            setAiRecommendation(res.data);
            setLoadingAiRecommendation(false);
        }).catch((err) => {
            console.debug(err);
            console.debug(filmName);
            if (err.status === 400) {
                console.error('Could not generate review for specified movie.');
            }
            navigate('/');
        });
    }, [filmName, navigate, postNoggin]);

    const omdbInfo = useOMDB(filmName);

    useEffect(() => {
        if (omdbInfo.error && omdbInfo.error.status !== 400) {
            navigate('/');
        }
    }, [omdbInfo.error, navigate])

    if (loadingAiRecommendation || omdbInfo.loading) {
        // return the code for a loader here.
    }

    return (
        <div className="container">
            {omdbInfo?.data && omdbInfo.data['Poster'] &&
                <div className="thumbnail">
                    <img src={omdbInfo.data['Poster']} alt="Movie Poster" className="movie-poster" />
                </div>
            }
            <div className="movie-details">
                <h2 id="movie-name">{filmName}</h2>
                <p id="movie-description">{omdbInfo?.data && omdbInfo.data['Plot'] &&
                    <>
                        <strong>Plot: </strong>
                        {omdbInfo.data['Plot']}
                        <br />
                    </>
                }
                    {aiRecommendation &&
                        <>
                            <br />
                            <strong>AI Generated Recommendation: </strong>
                            {aiRecommendation}
                            <br />
                        </>
                    }
                </p>
                {omdbInfo?.data?.imdbRating &&
                    <div id="star-rating" className="star-rating">
                        {omdbInfo.data.imdbRating}/10
                    </div>
                }
                {omdbInfo?.data && omdbInfo.data['Genre'] &&
                    <p className="genre">{omdbInfo.data['Genre']}</p>
                }
            </div>
        </div>
    );
}
