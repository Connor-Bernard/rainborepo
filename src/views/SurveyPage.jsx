import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from './style/Landing.module.css';
import classname from 'classnames';

import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';

export default function SurveyPage() {

    const surveyJson = {
        elements: [{
            name: "representation",
            title: "Is there any specific form of LGBTQIA representation you want to see?",
            type: "checkbox",
            choices: [
            "Lesbian representation", "Gay representation", "Bisexual representation", "Transgender representation"
            ]
        }, {
            name: "genderIdentity",
            title: "What Gender Identity are you looking for in the film?",
            type: "checkbox",
            choices: [
            "Male", "Female", "Non-binary"
            ]
        }, {
            name: "language",
            title: "Language Preference:",
            type: "checkbox",
            choices: [
            "English (original)", "English dubbed", "English subbed", "Non-English"
            ]
        }, {
            name: "genre",
            title: "Preferred Movie Genres (Select all that apply)",
            type: "checkbox",
            choices: [
                "Drama", "Romance", "Comedy", "Documentary", "Horror", "Thriller", "Action", "Science Fiction", "Fantasy", "Animation"            
            ]
        }, {
            name: "ageRating",
            title: "What age rating do you want?",
            type: "checkbox",
            choices: [
            "G: General Audiences", "PG: Parental Guidance Suggested", "PG-13: Parents Strongly Cautioned", "R: Restricted"
            ]
        }, {
            name: "additional",
            title: "Is there anything else we should know?",
            type: "comment",
            description: "Enter any additional information to help further customize your recommendations",
            placeholder: "I want a film with...",
            maxLength: 500,
            
        }]
      };

    const survey = new Model(surveyJson);

    return (
        
          
        //   function App() {
        //     const survey = new Model(surveyJson);
          
        //     return <Survey model={survey} />;
        //   }
          
        //   export default App;
        // <div>
        //     hello
        // </div>

        
          
        <Survey model={survey} />
    );
}
