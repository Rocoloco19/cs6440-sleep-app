import {createBrowserRouter, redirect} from "react-router-dom";
import ErrorPage from "../Error/Error";
import {SleepHistory} from "../../pages/SleepHistory/SleepHistory";
import {SleepSuggestions} from "../../pages/SleepSuggestions/SleepSuggestions";
import {SleepDisorders} from "../../pages/SleepDisorders/SleepDisorders";
import {Logout} from "../../pages/Logout/Logout";
import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import {Public} from "../Public/Public";
import connectFHIR from "../../services/FhirClient";
import {Home} from "../../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/public",
    element: <Public/>,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage/>,
    loader: async () => {
      const client = await connectFHIR()
      console.log(client);
      return client?.state.clientId;
    },
    children: [
      {
        index: true,
        loader: () => redirect('/home'),
      },
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