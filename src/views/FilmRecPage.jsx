import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sanitize } from 'dompurify';
import { useSearchParams } from 'react-router-dom';
import useOMDB from '../hooks/useOMDB';
import useRapid from '../hooks/useRapid';
import useReagent from '../hooks/useReagent';
import styles from './style/RecPage.module.css';
import classname from 'classnames';

export default function FilmRecPage() {
    const [loadingAiRecommendation, setLoadingAiRecommendation] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [streamingServices, setStreamingServices] = useState([]);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const filmName = useMemo(() => {
        return sanitize(searchParams.get('film'));
    }, [searchParams]);

    const postNoggin = useReagent({
        nogginId: 'obedient-lamprey-8688',
        apiKey: process.env.REACT_APP_FILM_RECOMMENDATION_PAGE_NOGGIN_API_KEY,
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
            if (err.status === 400) {
                console.error('Could not generate review for specified movie.');
            }
        });
    }, [filmName, navigate, postNoggin]);

    const omdbInfo = useOMDB(filmName);

    useEffect(() => {
        if (omdbInfo.error && omdbInfo.error.status !== 400) {
            navigate('/');
        }
    }, [omdbInfo.error, navigate]);

    const rapidInfo = useRapid({
        service: 'streaming-availability',
        endpoint: 'search/title',
        params: {
            country: 'us',
            title: filmName,
            output_language: 'en',
            show_type: 'all',
        },
    });

    useEffect(() => {
        let currServices = [];
        rapidInfo.data?.result.forEach((resObject) => {
            currServices = currServices.concat(resObject?.streamingInfo?.us?.map(s => s.service));
        });
        setStreamingServices([...new Set(currServices)]);
    }, [rapidInfo.data]);

    if (loadingAiRecommendation || omdbInfo.loading || rapidInfo.loading) {
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
                {omdbInfo?.data && omdbInfo.data['Poster'] &&
                    <div className={classname(styles.thumbnail)}>
                        <img
                            src={omdbInfo.data['Poster']}
                            alt="Movie Poster"
                            className={classname(styles.moviePoster)}
                        />
                    </div>
                }
                <div className={classname(styles.movieDetails)}>
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
                        <div id="star-rating" className={classname(styles.starRating)}>
                            {omdbInfo.data.imdbRating}/10
                        </div>
                    }
                    {omdbInfo?.data && omdbInfo.data['Genre'] &&
                        <p className={classname(styles.genre)}>{omdbInfo.data['Genre']}</p>
                    }

                    <div
                        className={classname(styles.streamingServices)}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 100px)', gap: '10px', justifyContent: 'center' }}
                    >
                        {streamingServices.map((service) => service && (
                            <img
                                src={`./images/${service}.png`}
                                alt={service}
                                className={styles.streamingServices}
                                style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 10px 10px 0' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
