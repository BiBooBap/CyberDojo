// client/src/utils/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn, getUserRole } from "./auth";

function ProtectedRoute({ children, requiredRole }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/loginpage" />;
  }

  const userRole = getUserRole();

  if (requiredRole && userRole !== requiredRole) {
    // Se l'utente non ha il ruolo richiesto, reindirizza
    return <Navigate to="/not-authorized" />;
  }

  return children;
}

export default ProtectedRoute;
