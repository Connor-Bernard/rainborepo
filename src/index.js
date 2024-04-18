import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecPage from './views/RecPage';
import PromptPage from './views/PromptPage'; 

const router = createBrowserRouter([
    {
        path: '/',
        element: <RecPage />
    },
    {
      path: '/prompt',
      element: <PromptPage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

