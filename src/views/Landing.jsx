import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style/Landing.module.css';
import classname from 'classnames';

export default function LandingPage() {
    return (
        
        <>
        
            <div className={classname(styles.taskHeader)}>
                <div>
                    <Link to="/" className={classname(styles.button)} id={styles.homeButton}>Home</Link>
                </div>

                {/* todo: figure out how to center title? */}   
                <div>
                    <h1>rainborepo</h1>
                </div>
            </div>

            <div className={classname(styles.container)}>
                <Link to="/prompt" className={classname(styles.button, styles.red)}>PROMPT</Link>
                <Link to="/survey" className={classname(styles.button, styles.blue)}>SURVEY</Link>
            </div>
        </>
    )
}