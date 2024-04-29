import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style/SurveyPage.module.css';
import classname from 'classnames';
import filmSurveyData from '../data/movieQuestions.json';
import bookSurveyData from '../data/bookQuestions.json';

import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import useReagent from '../hooks/useReagent';

export default function SurveyPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const postMoviesNoggin = useReagent({
        nogginId: 'mechanical-blackbird-3290',
        apiKey: process.env.REACT_APP_SURVEY_PAGE_FILM_NOGGIN_API_KEY,
    });
    const postBooksNoggin = useReagent({
        nogginId: 'deep-bass-2092',
        apiKey: process.env.REACT_APP_SURVEY_PAGE_BOOK_NOGGIN_API_KEY,
    });

    // TODO: throw this all into a single callback.
    const filmSurvey = new Model(filmSurveyData);
    const bookSurvey = new Model(bookSurveyData);

    filmSurvey.onComplete.add((sender) => {
        setError('');
        setLoading(true);
        const surveyResponseObject = filmSurveyData.elements.reduce((acc, curr) => {
            acc.push({
                question: curr.title,
                response: sender.data[curr.name],
            });
            return acc;
        }, []);
        postMoviesNoggin({ surveyResponse: JSON.stringify(surveyResponseObject) }).then((res) => {
            navigate(`/recommendation?film=${res.data}`);
        }).catch((err) => {
            if (err.status === 400) {
                setError('Could not generate a recommendation');
            }
        }).finally(() => {
            setLoading(false);
        });
    });

    bookSurvey.onComplete.add((sender) => {
        setError('');
        setLoading(true);
        const surveyResponseObject = filmSurveyData.elements.reduce((acc, curr) => {
            acc.push({
                question: curr.title,
                response: sender.data[curr.name],
            });
            return acc;
        }, []);
        postBooksNoggin({ surveyResponse: JSON.stringify(surveyResponseObject) }).then((res) => {
            navigate(`/recommendation?book=${res?.data?.book}&author=${res?.data?.author}`);
        }).catch((err) => {
            if (err.status === 400) {
                setError('Could not generate a recommendation');
            }
        }).finally(() => {
            setLoading(false);
        });

    });

    const theme = {
        "--sjs-general-backcolor": "#FAF8F0", // background of survey question boxes
        "--sjs-general-backcolor-dim": "#4B4E6D", // background of entire survey
        "--sjs-general-forecolor": "#000000", // color of text for questions
        "--sjs-primary-backcolor": "#222222", // background of complete button
        "--sjs-primary-backcolor-dark": "#4B4E6D", // background of complete button when hovered over
        "--sjs-general-backcolor-dim-light": "#F5F1E0", // background color of input boxes (checkboxes and text)
        "--sjs-general-backcolor-dim-dark": "#222222", // background color of input boxes (checkboxes and text) when hovered over
    };

    filmSurvey.applyTheme({
        "cssVariables": theme
    });
    bookSurvey.applyTheme({
        "cssVariables": theme
    });

    if (loading) {
        // TODO: return the code for a loader here.
    }

    const [mediaType, setMediaType] = useState('film');

    return (
        <>

            <div className={classname(styles.taskHeader)}>
                <div>
                    <Link to="/" className={classname(styles.button)} id={styles.homeButton}>Home</Link>
                </div>
                <div>
                    <h1>rainborepo</h1>
                </div>
            </div>

            <div className={classname(styles.toggleContainer)}>
                <button
                    type="button"
                    className={`btn ${mediaType === 'film' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setMediaType('film')}
                >
                    Film
                </button>
                <button
                    type="button"
                    className={`btn ${mediaType === 'book' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setMediaType('book')}
                >
                    Book
                </button>
            </div>

            <div>
                <Survey model={mediaType === 'book' ? bookSurvey : filmSurvey} />
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}
