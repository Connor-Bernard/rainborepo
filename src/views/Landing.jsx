import React from 'react';
import { Link } from 'react-router-dom';
import './style/Landing.css';

export default function LandingPage() {
    return (
        <>
            <div class="task-header">
                <div>
                    <Link to="/" class="button" id="home-button">Home</Link>
                </div>

                {/* todo: figure out how to center title? */}
                <div>
                    <h1>rainborepo</h1>
                </div>
            </div>

            <div class="container">
                <Link to="/prompt" class="button red">PROMPT</Link>
                <Link to="/survey" class="button blue">SURVEY</Link>
            </div>
        </>
    )
}