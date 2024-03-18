import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {SleepHistory} from "./pages/SleepHistory/SleepHistory";
import {SleepSuggestions} from "./pages/SleepSuggestions/SleepSuggestions";
import ErrorPage from "./common/Error/Error";
import {SleepDisorders} from "./pages/SleepDisorders/SleepDisorders";
import {Logout} from "./pages/Logout/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'sleep-history',
        element: <SleepHistory />,
      },
      {
        path: 'sleep-suggestions',
        element: <SleepSuggestions />,
      },
      {
        path: 'sleep-disorders',
        element: <SleepDisorders />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
