import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style/SurveyPage.module.css';
import classname from 'classnames';
import movieSurveyData from '../data/movieQuestions.json';
import bookSurveyData from '../data/bookQuestions.json';
import mediaFormSurveyData from '../data/mediaFormQuestion.json';

import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import useReagent from '../hooks/useReagent';

export default function SurveyPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const postNoggin = useReagent({
        nogginId: 'mechanical-blackbird-3290',
        apiKey: process.env.REACT_APP_SURVEY_PAGE_NIGGIN_API_KEY,
    });

    const movieSurvey = new Model(movieSurveyData);
    const bookSurvey = new Model(bookSurveyData);
    const mediaFormSurvey = new Model(mediaFormSurveyData);

    movieSurvey.onComplete.add((sender) => {
        setError('');
        setLoading(true);
        const surveyResponseObject = movieSurveyData.elements.reduce((acc, curr) => {
            console.log(sender.data);
            acc.push({
                question: curr.title,
                response: sender.data[curr.name],
            });
            return acc;
        }, []);
        postNoggin({ surveyResponse: JSON.stringify(surveyResponseObject) }).then((res) => {
            navigate(`/recommendation?rec=${res.data}`);
        }).catch((err) => {
            if (err.status === 400) {
                setError('Could not generate a recommendation');
            }
        }).finally(() => {
            setLoading(false);
        });
    });

    movieSurvey.applyTheme({
        "cssVariables": {
            "--sjs-general-backcolor-dim": "#29161d",
            "--sjs-primary-backcolor": "#085ED7"
        }
    });
    bookSurvey.applyTheme({
        "cssVariables": {
            "--sjs-general-backcolor-dim": "#29161d",
            "--sjs-primary-backcolor": "#085ED7"
        }
    });
    mediaFormSurvey.applyTheme({
        "cssVariables": {
            "--sjs-general-backcolor-dim": "#29161d",
            "--sjs-primary-backcolor": "#085ED7"
        }
    });

    if (loading) {
        // TODO: return the code for a loader here.
    }
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
            <div>
                <Survey model={mediaFormSurvey} />
                {/* todo: conditionally render surveys based on first response */}
                <Survey model={movieSurvey} />
                <Survey model={bookSurvey} />
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}
