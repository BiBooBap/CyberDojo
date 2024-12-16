import ticketFacade from "./services/ticketFacade";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// AdminTicketDashboard component
function AdminTicketDashboard() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");
  const [activeLink, setActiveLink] = useState("");

  // Function to handle the click on the sidebar links
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Fetch the tickets when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketFacade.getSupportTickets(token);
        setTickets(data);
        setActiveLink("all");
      } catch (error) {
        console.error("Errore nel caricamento dei ticket:", error);
      }
    };

    fetchTickets();
  }, []);

  // Filter the tickets based on the active link
  const openTickets = tickets.filter((tickets) => tickets.is_open === "Aperto");
  const closedTickets = tickets.filter(
    (tickets) => tickets.is_open === "Risolto"
  );

  // Return the JSX to render
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[500px] bg-[#8773B9] text-white p-8 min-h-screen">
        <h2 className="text-2xl font-bold pb-8 pt-8">Dashboard Admin</h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/admin/adminTicketDashboard"
              className="text-yellow-400 font-bold hover:text-yellow-300"
            >
              Area Ticket
            </Link>
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <Link
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
      {/* Main content */}
      <main className="flex-grow p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeLink === "all" &&
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4 min-w-10"
              >
                {ticket.is_open === "Aperto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-red-300"></div>
                )}
                {ticket.is_open === "Risolto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-green-300"></div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {ticket.user_username}
                  </h3>
                  <p className="mt-2">"{ticket.description}"</p>
                  <h2 className="text-n mt-2 text-gray-300">
                    {(ticket.is_open === "Aperto" && "Aperto") ||
                      (ticket.is_open === "Risolto" && "Chiuso")}
                  </h2>
                  <p className="text-sm mt-2">
                    {new Date(ticket.creation_date).toLocaleDateString()}
                  </p>
                  {(ticket.is_open === "Aperto" &&
                  <button className="bg-[#8773B9] text-white mt-3 px-4 py-2 rounded-lg">
                      <Link to={`/admin/adminTicketDetail/${ticket._id}`}>
                      Rispondi
                    </Link>
                  </button>)
                  ||
                      (ticket.is_open === "Risolto" &&
                      <button className="bg-[#8773b946] text-white mt-3 px-4 py-2 rounded-lg">
                        Chiuso
                    </button>)}
                </div>
              </div>
            ))}
          {activeLink === "closed" &&
            closedTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4 min-w-10"
              >
                {ticket.is_open === "Aperto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-green-300"></div>
                )}
                {ticket.is_open === "Risolto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-red-300"></div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {ticket.user_username}
                  </h3>
                  <p className="mt-2">"{ticket.description}"</p>
                  <h2 className="text-n mt-2 text-gray-300">
                    {(ticket.is_open === "Aperto" && "Aperto") ||
                      (ticket.is_open === "Risolto" && "Chiuso")}
                  </h2>
                  <p className="text-sm mt-2">
                    {new Date(ticket.creation_date).toLocaleDateString()}
                  </p>
                  <button className="bg-[#8773b946] text-white mt-3 px-4 py-2 rounded-lg">
                        Chiuso
                    </button>
                </div>
              </div>
            ))}
          {activeLink === "open" &&
            openTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4 min-w-10"
              >
                {ticket.is_open === "Aperto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-green-300"></div>
                )}
                {ticket.is_open === "Risolto" && (
                  <div className="flex h-11 w-11 shrink-0 grow-0 items-center justify-center rounded-full bg-red-300"></div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {ticket.user_username}
                  </h3>
                  <p className="mt-2">"{ticket.description}"</p>
                  <h2 className="text-n mt-2 text-gray-300">
                    {(ticket.is_open === "Aperto" && "Aperto") ||
                      (ticket.is_open === "Risolto" && "Chiuso")}
                  </h2>
                  <p className="text-sm mt-2">
                    {new Date(ticket.creation_date).toLocaleDateString()}
                  </p>
                  <button className="bg-[#8773B9] text-white mt-3 px-4 py-2 rounded-lg">
                      <Link to={`/admin/adminTicketDetail/${ticket._id}`}>
                      Rispondi
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default AdminTicketDashboard;
