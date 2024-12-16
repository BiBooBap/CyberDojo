// client/src/utils/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn, getUserRole } from "./auth";

// If user is not logged in, redirect to login page
function NotAdminRoute({ children }) {
  const userRole = getUserRole();
  if (userRole === "admin") {
    return <Navigate to="/admin/adminTicketDashboard" />;
  }

  return children;
}

export default NotAdminRoute;
