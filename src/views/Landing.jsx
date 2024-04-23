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
                <Link to="/prompt" className={classname(styles.button, styles.red, styles.largeFont)}>PROMPT <br></br>
                    <span className={styles.smallFont}>Explore our media treasure trove with Rainborepo AI! Unearth the perfect recommendation tailored just for you by effortlessly searching through our extensive database.</span>
                </Link>
                <Link to="/survey" className={classname(styles.button, styles.blue, styles.largeFont)}>SURVEY
                    <br />
                    <span className={styles.smallFont}>Hitting a mental block? Simply breeze through a short survey and let our AI generate tailored recommendations just for you!</span>
                </Link>
            </div>
        </>
    )
}
