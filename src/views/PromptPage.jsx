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

    const postNoggin = useReagent({
        nogginId: 'jolly-lizard-1782',
        apiKey: process.env.REACT_APP_PROMPT_PAGE_NOGGIN_API_KEY,
    });

    function handleSubmit(e) {
        e.preventDefault();
        const userPrompt = sanitize(inputField.current.value);
        if (!userPrompt) {
            setError('Please enter a prompt.');
            return;
        }
        setError('');
        setLoading(true);
        postNoggin({
            description: inputField.current.value,
        }).then((res) => {
            navigate(`/recommendation?rec=${res.data}`)
        }).catch((err) => {
            if (err.status === 400) {
                setError('The provided prompt was not specific enough.');
            }
        }).finally(() => {
            setLoading(false);
        });
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
                <div>
                    <h1>rainborepo</h1>
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
                        <button type="submit" className="btn btn-secondary">Give me a film!</button>
                        <button type="submit" className="btn btn-secondary" style={{ marginLeft: '10px' }}>Give me a book!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
