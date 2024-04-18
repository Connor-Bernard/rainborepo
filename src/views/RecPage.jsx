import React from 'react';
import './style/RecPage.css';

export default function RecPage() {
    return (
        <body>
            <div className="container">
                <div className="thumbnail">
                    <img src="path_to_default_poster_image.jpg" alt="Movie Poster" className="movie-poster" />
                </div>
                <div className="movie-details">
                    <h2 id="movie-name">Moonlight</h2>
                    <p id="movie-description">AI Summary:"Moonlight" is a film that follows the life of a
                        young black man named Chiron as he navigates his identity and sexuality in a tough
                        Miami neighborhood. Divided into three chapters, it portrays his journey from childhood
                        to adulthood, exploring his struggles with his identity and sexuality, particularly his
                        experiences as a gay man in a hyper-masculine environment. The film beautifully portrays
                        themes of love, self-discovery, and acceptance within the LGBTQ community, offering a
                        poignant and intimate exploration of Chiron's journey toward embracing his true self
                        despite societal pressures and expectations.</p>
                    <div id="star-rating" className="star-rating"></div>
                    <p className="quote">"La La Land deserved Best Picture."</p>
                </div>
            </div>
        </body>
    )
}