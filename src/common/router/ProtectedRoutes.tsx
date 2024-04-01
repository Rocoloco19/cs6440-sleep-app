import React from "react";

import {Navigate, useLoaderData} from "react-router-dom";
import App from "../../app/App";

const ProtectedRoutes = () => {
  const clientId = useLoaderData();
  return clientId ? <App/> : <Navigate to="/Public"  replace />;
};

export default ProtectedRoutes;