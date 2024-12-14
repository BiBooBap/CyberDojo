import ticketFacade from "./services/ticketFacade";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminTicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");

  const user = jwtDecode(localStorage.getItem("token"));

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await ticketFacade.getTicketDetails(id, token);
        setTicket(data);
      } catch (error) {
        console.error("Errore nel caricamento del ticket:", error);
      }
    };
    fetchTicket();
  }, [id, token]);

  const closeTicket = async () => {
    try {
      await ticketFacade.closeTicket(id, token);
      alert("Ticket chiuso con successo.");
      window.location.href = "/admin/adminTicketDashboard";
    } catch (error) {
      console.error("Errore nella chiusura del ticket:", error);
    }
  };

  const addMessage = async () => {
    try {
      await ticketFacade.addMessage(id, user.username, message, user.role, token);
      alert("Messaggio inviato con successo.");
      window.location.reload();
    } catch (error) {
      console.error("Errore nell'invio del messaggio:", error);
    }
  }

  if (!ticket) {
    return <div className="flex items-center justify-center mt-16">Caricamento...</div>;
  }

  return (
    <div className="min-h-screen flex pt-16">
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{ticket.description}</h1>
          <p className="text-lg mb-2">User: [{ticket.user_username}]</p>
          <h2 className="text-2xl font-bold mb-4">Messaggi</h2>
          {ticket.messages.map((message, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-lg mb-2"><strong>Username:</strong> {message.username}</p>
              <p className="text-lg mb-2"><strong>Messaggio:</strong> {message.message}</p>
              <p className="text-lg mb-2"><strong>Ruolo:</strong> {message.role}</p>
              <p className="text-lg mb-2"><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
            </div>
          ))}
          {ticket.is_open === "Aperto" &&
          <div>
            <textarea
              className="w-full p-4 mb-4 rounded-lg bg-gray-100 text-gray-700"
              placeholder="Scrivi una risposta"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
            </textarea>
          <div className="flex space-x-4">
            <button 
            className="bg-[#54295c] text-white px-6 py-2 rounded-lg"
            onClick={closeTicket}>
              Chiudi ticket
            </button>
            <button 
            className="bg-[#54295c] text-white px-6 py-2 rounded-lg"
            onClick={addMessage}>
              Invia risposta
            </button>
          </div>
          </div>}
        </div>
      </main>
    </div>
  );
}

export default AdminTicketDetail;
