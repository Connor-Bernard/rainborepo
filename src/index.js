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

const router = createBrowserRouter([
    {
        path: '/',
        element: <RecPage />
    },
    {
      path: '/prompt',
      element: <PromptPage />
    },
    {
      path: '/survey',
      element: <SurveyPage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

