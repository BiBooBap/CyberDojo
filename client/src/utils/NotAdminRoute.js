// client/src/utils/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn, getUserRole } from "./auth";

function NotAdminRoute({ children }) {
  const userRole = getUserRole();
  if (userRole === "admin") {
    return <Navigate to="/admin/adminTicketDashboard" />;
  }

  return children;
}

export default NotAdminRoute;
