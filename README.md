# RainboRepo

## About

This is a media recommendations app specitically for LGBTQIA+ recommendations.  It supports queries for both books and films.  Not only does it provide recommendations for the selected media type, but it utilizes GPT 4 Turbo to generate personalized descriptions of the recommended media.

## Set Up

### Environment Configuration

To work with this application, you will need to set up the following environment variables in your '.env' file:

- `REACT_APP_PROMPT_PAGE_FILM_NOGGIN_API_KEY`
- `REACT_APP_PROMPT_PAGE_BOOK_NOGGIN_API_KEY`
- `REACT_APP_FILM_RECOMMENDATION_PAGE_NOGGIN_API_KEY`
- `REACT_APP_BOOK_RECOMMENDATION_PAGE_NOGGIN_API_KEY`
- `REACT_APP_SURVEY_PAGE_FILM_NOGGIN_API_KEY`
- `REACT_APP_SURVEY_PAGE_BOOK_NOGGIN_API_KEY`
- `REACT_APP_OMDB_API_KEY`
- `REACT_APP_RAPID_API_KEY`

### Noggin API Keys

Noggin API keys are provided on request of the developers.  Please make a request by emailing [Connor Bernard](connorbernard@berkeley.edu) directly.

### OMDB API Key

To get your OMDB API key, go to [the OMDB API key request page](https://www.omdbapi.com/apikey.aspx) and sign up for a free API key.

### Rapid API Key

To get your Rapid API key, [sign up for Rapid API](https://rapidapi.com/) and use the API key provided.

## Starting the app

### Docker

We recommend you use [Docker](https://www.docker.com/) to build and run the app.  After configuring your environment and ensuring you have docker installed, run the following command:

```bash
docker-compose up --build -dV
```

This will run your docker stack locally on port 3000.  You can then access the app at localhost:3000.

### npm

You can also run the app with npm.  You first will have to install the necessary node modules.  To do so, navigate to the project directory and run:

```bash
npm i
```

Then, you can start the development server on localhost:3000 with:

```bash
npm run start
```
