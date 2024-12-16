import { data } from "react-router-dom";

const ticketService = {
  // Function to retrieve support tickets
  getSupportTickets: async (token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        // Add Authorization header if token is provided
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        token = null;
      }

      // Make a GET request to retrieve tickets
      const response = await fetch("http://localhost:3001/assistance/tickets", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei ticket di supporto");
      }

      // Parse the response data
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("La risposta dell'API non è valida");
      }
      return data;
    } catch (error) {
      console.error("Errore nel recupero dei ticket di supporto:", error);
      throw error;
    }
  },

  // Function to retrieve ticket details
  getTicketDetails: async (id, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        token = null;
      }
      // Make a GET request to retrieve ticket details
      const response = await fetch(`http://localhost:3001/assistance/ticket?id=${id}`, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dettagli del ticket");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel recupero: ", error);
      throw error;
    }
  },

  // Function to close a ticket
  closeTicket: async (id, token) => {
    try {
      const response = await fetch(`http://localhost:3001/assistance/closeticket?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dettagli del ticket");
      }
    } catch (error) {
      console.error("Errore nel recupero: ", error);
      throw error;
    }
  },

  // Function to add a message to a ticket
  addMessage: async (id, username, message, role, token) => {
    try {
      const response = await fetch(`http://localhost:3001/assistance/addmessage?id=${id}&username=${username}&message=${message}&role=${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dettagli del ticket");
      }
    } catch (error) {
      console.error("Errore nel recupero: ", error);
      throw error;
    }
  },
};

export default ticketService;
