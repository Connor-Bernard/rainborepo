import React from 'react';
import { Link } from 'react-router-dom';
import './style/PromptPage.css';

export default function PromptPage() {
    return (
        <>
            <div className="task-header">
                <div>
                    <Link to="/" className="button" id="home-button">Home</Link>
                </div>

                <div>
                    <h1>rainborepo</h1>
                </div>
            </div>

            <div className="container">
                <h1>rainborepo AI</h1>
                <form id="textInputForm">
                    <div className="form-group">
                        <label for="inputText">Please describe the medium you would like to consume. Our AI will provide the
                            best recommendation.</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Enter text" />
                    </div>

                    <button type="submit" className="btn btn-primary" onclick="redirectToRecPage()">recommend rainborepo!</button>
                </form>
            </div>
        </>
    )
}