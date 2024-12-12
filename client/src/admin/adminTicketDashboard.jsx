import ticketFacade from "./services/ticketFacade";
import React, { useState, useEffect } from "react";
import AdminSidebar from "./layout/adminSidebar.jsx";

function AdminTicketDashboard() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketFacade.getSupportTickets(token);
        setTickets(data);
      } catch (error) {
        console.error("Errore nel caricamento dei ticket:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-grow p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4"
            >
              <div className="w-16 h-16 rounded-full bg-teal-400"></div>
              <div>
                <h3 className="text-lg font-semibold">
                  {ticket.user_username}
                </h3>
                <p>{ticket.description}</p>
                <p className="text-sm mt-2">
                  {new Date(ticket.creation_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminTicketDashboard;
