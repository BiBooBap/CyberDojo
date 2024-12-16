// client/src/utils/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn, getUserRole } from "./auth";

// ProtectedRoute component
function ProtectedRoute({ children, requiredRole }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/accessPage" />;
  }

  // Get the user role
  const userRole = getUserRole();

  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin/adminTicketDashboard" />;
    }
    if (userRole === "user") {
      return <Navigate to="/areaUtente" />;
    } else {
      return <Navigate to="/not-authorized" />;
    }
  }

  return children;
}

export default ProtectedRoute;
