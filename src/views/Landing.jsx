import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style/Landing.module.css';
import classname from 'classnames';

const AboutInfo = () => (
  <div className="p-4">
    <h5>What is rainborepo?</h5>
    <p>
    A user-friendly app designed to connect LGBTQIA+ / explorers of this community with a curated selection of films and books in
     such a way that highlights their historical underrepresention. Our internal database provides tailored recommendations based on a user given prompt or 
     based on answers to a quick survey. Whether you have a specific narrative in mind or not, rainborepo will provide a satisfying recommendation based on your desires 
     with the use of AI.


    </p>
  </div>
);

export default function LandingPage() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
        <>
            <div className={classname(styles.taskHeader)}>
                <div>
                    <Link to="/" className={classname(styles.button)} id={styles.homeButton}>Home</Link>
                </div>

                {/* todo: figure out how to center title? */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`./images/rainborepo-colored.png`} alt="Logo" style={{ width: '100px', height: '100px', marginRight: '10px',verticalAlign: 'middle' }} />
                    <h1 style={{ margin: '0',verticalAlign: 'middle', lineHeight: '1'  }}>rainborepo</h1>
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

            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
                <button className="btn btn-info" onClick={toggleDrawer}>
                    About
                </button>
                {open && (
                    <div className="position-fixed" style={{ bottom: '80px', left: '60px', right: '60px', zIndex: 1000 }}>
                        <div className="card">
                            <AboutInfo />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
