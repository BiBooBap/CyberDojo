import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Functional component for the admin sidebar navigation
function AdminSidebar() {
  const location = useLocation();
  const [isTicketExpanded, setIsTicketExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/admin/tickets")) {
      setIsTicketExpanded(true);
    }
  }, [location.pathname]);

// Handle link click to set the active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    // Sidebar container with styling classes
    <aside className="w-[26rem] bg-[#8773B9] text-white p-8 min-h-screen">
      <h2 className="text-2xl font-bold pb-8 pt-8">Dashboard Admin</h2>
      <ul>
        // Navigation links for the admin dashboard
        <li className="mb-4">
          <Link
            to="/admin/adminTicketDashboard"
            className="text-yellow-400 font-bold hover:text-yellow-300"
            onClick={() => setIsTicketExpanded(!isTicketExpanded)} // Toggle the ticket area expansion
          >
            Area Ticket
          </Link>
          <ul className="ml-4 mt-2">
            <li className="mb-2">
              <Link
                to="/admin/tickets/precedente"
                className={`text-white hover:text-gray-300 ${
                  activeLink === "all" ? "underline text-yellow-400" : ""
                }`}
                onClick={() => handleLinkClick("all")}
              >
                Tutti i ticket
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin/tickets/precedente"
                className={`text-white hover:text-gray-300 ${
                  activeLink === "closed" ? "underline text-yellow-400" : ""
                }`}
                onClick={() => handleLinkClick("closed")}
              >
                Ticket risolti
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tickets/prossimo"
                className={`text-white hover:text-gray-300 ${
                  activeLink === "open" ? "underline text-yellow-400" : ""
                }`}
                onClick={() => handleLinkClick("open")}
              >
                Ticket aperti
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
