import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecPage from './views/RecPage';
import PromptPage from './views/PromptPage';
import SurveyPage from './views/SurveyPage';
import LandingPage from './views/Landing';
import About from './views/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/recommendation',
    element: <RecPage />
  },
  {
    path: '/prompt',
    element: <PromptPage />
  },
  {
    path: '/survey',
    element: <SurveyPage />
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

