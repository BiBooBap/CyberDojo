// client/src/utils/VisitorRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./auth";

// If the user is logged in, redirect to homepage
function VisitorRoute({ children }) {
  return !isUserLoggedIn() ? children : <Navigate to="/homepage" replace />;
}

export default VisitorRoute;