import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import styles from './style/PromptPage.module.css';
import classname from 'classnames';

export default function PromptPage() {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholderTexts = ["A documentary of a foreign couple before gay rights.", "An elderly man with a same sex partner", "A fictional LGBTQ story with a sad ending"]; // Your list of preset texts
    
    // Cycle through presets every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholderTexts.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []); 

    return (
        <>
            <title>Prompt Page</title>
            <body>
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
                    <form id={styles.inputText}>
                        <div className={classname(styles.formGroup)}>
                            <div className={classname(styles.labelContainer)}>
                                <label htmlFor="inputText">Please describe the medium you would like to consume. Our AI will provide the
                                    best recommendation.</label>
                                <input type="text" className="form-control" placeholder={placeholderTexts[placeholderIndex]} />
                            </div>

                            {/* TODO Connor, please add the logic for the redirecting of this button. It currently calls the old JS redirect function. */}
                            <button type="submit" className="btn btn-primary">recommend rainborepo!</button>
                        </div>
                    </form>
                </div>
            </body>
        </>
    )
}