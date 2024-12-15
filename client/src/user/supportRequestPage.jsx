import React, { useState, useEffect } from "react";
import assistanceFacade from "../services/assistanceFacade";
import { jwtDecode } from "jwt-decode";

function SupportRequest() {
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [userTickets, setUserTickets] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  let username = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.username;
    } catch (err) {
      console.error("Errore nel decodificare il token:", err);
      setError("Token non valido. Effettua nuovamente il login.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionRegex = /^.{10,}$/;

    if (!descriptionRegex.test(description)) {
      alert("La descrizione deve contenere almeno 10 caratteri.");
      return;
    }

    const messageRegex = /^.{10,}$/;

    if (!messageRegex.test(message)) {
      alert("Il messaggio deve contenere almeno 10 caratteri.");
      return;
    }

    try {
      await assistanceFacade.sendSupportRequest(username, description, token, message);
      alert("Richiesta inviata con successo!");
      setDescription("");
      setMessage("");
      fetchUserTickets();
    } catch (error) {
      console.error("Errore durante l'invio della richiesta:", error);
      setError("Errore durante l'invio della richiesta. Riprova più tardi.");
    }
  };

  const fetchUserTickets = async () => {
    try {
      const tickets = await assistanceFacade.getUserTickets(token, username);
      setUserTickets(tickets);
    } catch (error) {
      console.error("Errore nel recupero dei ticket dell'utente:", error);
      setError("Errore nel recupero dei tuoi ticket. Riprova più tardi.");
    }
  };

  useEffect(() => {
    if (token && username) {
      fetchUserTickets();
    }
  }, [token, username]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="bg-[#e0a11b] rounded-lg p-8 shadow-lg w-full max-w-md mb-8 mt-2">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            Richiedi supporto
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input tipe="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-2xl text-gray-700 mb-2"
                placeholder="Titolo della richiesta"
                rows="4"
                required
              />
              <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Messaggio"
              className="w-full p-2 mb-4 rounded-2xl text-gray-700"
              required
            />
            </div>
            <button
              type="submit"
              className="w-full bg-[#54295c] text-white py-2 rounded-2xl hover:bg-[#4b214f] transition duration-200"
            >
              Invia richiesta
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>

        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Le mie richieste di supporto
          </h2>
          {userTickets.length === 0 ? (
            <p className="text-center">Non hai inviato nessuna richiesta.</p>
          ) : (
            <ul className="space-y-4">
              {userTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  className="border rounded-lg p-4 shadow-md bg-gray-50"
                >
                  <p>
                    <strong>ID Ticket:</strong> {ticket._id}
                  </p>
                  <p>
                    <strong>Descrizione:</strong> {ticket.description}
                  </p>
                  <p>
                    <strong>Stato:</strong>
                    {ticket.is_open === "Aperto" ? (
                      <span className="text-green-600">Aperto</span>
                    ) : (
                      <span className="text-red-600">Risolto</span>
                    )}
                  </p>
                  <p>
                    <strong>Data Creazione:</strong>{" "}
                    {new Date(ticket.creation_date).toLocaleString()}
                  </p>
                  {ticket.messages && ticket.messages.length > 0 && (
                    <div className="mt-4">
                      <strong>Messaggi:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {ticket.messages.map((message, index) => (
                          <li key={index} className="mb-2">
                            <p>
                              <strong>{message.username}:</strong>{" "}
                              {message.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default SupportRequest;
