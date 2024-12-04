import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [isTicketExpanded, setIsTicketExpanded] = useState(false);

  useEffect(() => {
    // Espandi automaticamente la sezione Area Ticket se siamo su una pagina di dettaglio ticket
    if (location.pathname.includes("/admin/tickets")) {
      setIsTicketExpanded(true);
    }
  }, [location.pathname]);

  if (!isAdmin) {
    return null;
  }

return (
    <aside className="w-1/4 bg-[#54295c] text-white p-8 min-h-screen">
        <h2 className="text-2xl font-bold mb-8">Dashboard Admin</h2>
        <ul>
            <li className="mb-4">
                <Link to="/admin/statistiche" className="text-white hover:text-gray-300">
                    Statistiche
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to="/admin/adminTicketDashboard"
                    className="text-yellow-400 font-bold hover:text-yellow-300"
                    onClick={() => setIsTicketExpanded(!isTicketExpanded)}
                >
                    Area Ticket
                </Link>
                {isTicketExpanded && (
                    <ul className="ml-4 mt-2">
                        <li className="mb-2">
                            <Link to="/admin/tickets/precedente" className="text-white hover:text-gray-300">
                                Ticket Precedente
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/tickets/prossimo" className="text-white hover:text-gray-300">
                                Prossimo Ticket
                            </Link>
                        </li>
                    </ul>
                )}
            </li>
            {/* Aggiungi altri link admin qui se necessario */}
        </ul>
    </aside>
);
}

export default AdminSidebar;
