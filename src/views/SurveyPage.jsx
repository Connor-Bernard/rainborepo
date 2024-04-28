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
    const postNoggin = useReagent({
        nogginId: 'mechanical-blackbird-3290',
        apiKey: process.env.REACT_APP_SURVEY_PAGE_NIGGIN_API_KEY,
    });

    const filmSurvey = new Model(filmSurveyData);
    const bookSurvey = new Model(bookSurveyData);

    filmSurvey.onComplete.add((sender) => {
        setError('');
        setLoading(true);
        const surveyResponseObject = filmSurveyData.elements.reduce((acc, curr) => {
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

    const [ media , setMedia ] = useState("film");

    const [ selectedSurvey , setSelectedSurvey ] = useState(filmSurvey);

    const setFilm = () => {
        setMedia("film");
        setSelectedSurvey(filmSurvey);
    }

    const setBook = () => {
        setMedia("book");
        setSelectedSurvey(bookSurvey);
    }

    const filmBtn = media === "film" ?
    <h2 onClick={setFilm} style={{
        backgroundColor: "#FAF8F0",
        color: "black",
        padding: "3px"
    }}>Find a Film!</h2>
    :
    <h2 onClick={setFilm} style={{
        backgroundColor: "grey",
        color: "black",
        padding: "3px"
    }}>Find a Film!</h2>

    const bookBtn = media === "book" ?
    <h2 onClick={setBook} style={{
        backgroundColor: "#FAF8F0",
        color: "black",
        padding: "3px"
    }}>Find a Book!</h2>
    :
    <h2 onClick={setBook} style={{
        backgroundColor: "grey",
        color: "black",
        padding: "3px"
    }}>Find a Book!</h2>

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
                <div className={classname(styles.toggle)}>
                    {filmBtn}
                </div>
                <div className={classname(styles.toggle)}>
                    {bookBtn}
                </div>
            </div>
            
            <div>
                <Survey model={selectedSurvey} />
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}
