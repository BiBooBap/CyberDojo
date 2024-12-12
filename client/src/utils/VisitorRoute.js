// client/src/utils/VisitorRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./auth";

function VisitorRoute({ children }) {
  // Se l'utente è loggato, reindirizza alla homepage
  return !isUserLoggedIn() ? children : <Navigate to="/homepage" replace />;
}

export default VisitorRoute;