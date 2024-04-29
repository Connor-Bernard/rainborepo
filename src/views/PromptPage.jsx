import React, { useState, useEffect, useMemo, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useNavigate } from 'react-router-dom';
import styles from './style/PromptPage.module.css';
import classname from 'classnames';
import useReagent from '../hooks/useReagent';
import { sanitize } from 'dompurify';

export default function PromptPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [mediaType, setMediaType] = useState();

    const navigate = useNavigate();

    const inputField = useRef();

    const placeholderTexts = useMemo(() => [
        'A documentary of a foreign couple before gay rights.',
        'An elderly man with a same sex partner',
        'A fictional LGBTQ story with a sad ending',
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholderTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [placeholderTexts]);

    const postFilmNoggin = useReagent({
        nogginId: 'jolly-lizard-1782',
        apiKey: process.env.REACT_APP_PROMPT_PAGE_FILM_NOGGIN_API_KEY,
    });

    const postBookNoggin = useReagent({
        nogginId: 'round-reindeer-8693',
        apiKey: process.env.REACT_APP_PROMPT_PAGE_BOOK_NOGGIN_API_KEY,
    });

    function handleSubmit(e) {
        console.debug(e);
        e.preventDefault();
        const userPrompt = sanitize(inputField.current.value);
        if (!userPrompt) {
            setError('Please enter a prompt.');
            return;
        }
        setError('');
        setLoading(true);
        if (mediaType === 'book') {
            postBookNoggin({
                description: inputField.current.value,
            }).then((res) => {
                navigate(`/recommendation?book=${res.data.title}&author=${res.data.author}`);
            }).catch((err) => {
                if (err.status === 400) {
                    setError('The provided prompt was not specific enough.');
                }
            }).finally(() => {
                setLoading(false);
            });

        } else {
            postFilmNoggin({
                description: inputField.current.value,
            }).then((res) => {
                navigate(`/recommendation?film=${res.data}`)
            }).catch((err) => {
                if (err.status === 400) {
                    setError('The provided prompt was not specific enough.');
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    if (loading) {
        // TODO: return the code for a loader here.
    }
    return (
        <div className={classname(styles.body)}>
            <div className={classname(styles.taskHeader)}>
                <div>
                    <Link to="/" className={classname(styles.button)} id={styles.homeButton}>Home</Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`./images/rainborepo-colored.png`}
                        alt="Logo"
                        style={{ width: '100px', height: '100px', marginRight: '10px', verticalAlign: 'middle' }}
                    />
                    <h1 style={{ margin: '0', verticalAlign: 'middle', lineHeight: '1' }}>rainborepo</h1>
                </div>
            </div>

            <div className={classname(styles.container)}>
                <h1>rainborepo AI</h1>
                <form id={styles.inputText} onSubmit={handleSubmit}>
                    <div className={classname(styles.formGroup)}>
                        <div className={classname(styles.labelContainer)}>
                            <label htmlFor="inputText">
                                Please describe the medium you would like to consume. Our AI will provide the
                                best recommendation.
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={placeholderTexts[placeholderIndex]}
                                ref={inputField}
                            />
                        </div>
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        <div>
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                onClick={() => setMediaType('film')}
                            >
                                Give me a film!
                            </button>
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                style={{ marginLeft: '10px' }}
                                onClick={() => setMediaType('book')}
                            >
                                Give me a book!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
