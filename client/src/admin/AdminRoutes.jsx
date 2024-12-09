import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./layout/adminSidebar.jsx";
import AdminTicketDashboard from "./adminTicketDashboard.jsx";
import AdminTicketDetail from "./adminTicketDetail.jsx";

function AdminRoutes() {
  return (
    <div className="admin-layout flex">
      <AdminSidebar />
      <div className="admin-content flex-grow">
        <Routes>
          <Route path="adminTicketDashboard" element={<AdminTicketDashboard />} />
          <Route path="adminTicketDetail" element={<AdminTicketDetail />} />
          {/* Altre route admin */}
        </Routes>
      </div>
    </div>
  );
}

export default AdminRoutes;