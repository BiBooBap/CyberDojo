const ticketService = {
  getSupportTickets: async (token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        token = null;
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:3001/assistance/tickets", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei ticket di supporto");
      }
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
};

export default ticketService;
