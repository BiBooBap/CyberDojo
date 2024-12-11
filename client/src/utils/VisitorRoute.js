// client/src/utils/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./auth";

function LoggedRoute({ children }) {
  return !isUserLoggedIn() ? children : <Navigate to="/areaUtente" />;
}

export default LoggedRoute;
