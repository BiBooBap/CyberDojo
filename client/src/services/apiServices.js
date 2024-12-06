const apiService = {
    // Funzione per inviare una richiesta di supporto
    sendSupportRequest: async (data) => {
      try {
        const response = await fetch("https://api.example.com/support", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response.json();
      } catch (error) {
        console.error("Errore durante l'invio della richiesta di supporto:", error);
        throw error;
      }
    },
  
    // Espansione futura: Funzione per recuperare tutte le richieste di supporto
    // getSupportRequests: async () => {
    //   try {
    //     const response = await fetch("https://api.example.com/support", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     return response.json();
    //   } catch (error) {
    //     console.error("Errore durante il recupero delle richieste di supporto:", error);
    //     throw error;
    //   }
    // },
  
    // Espansione futura: Funzione per aggiornare una richiesta di supporto
    // updateSupportRequest: async (id, updatedData) => {
    //   try {
    //     const response = await fetch(`https://api.example.com/support/${id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(updatedData),
    //     });
    //     return response.json();
    //   } catch (error) {
    //     console.error("Errore durante l'aggiornamento della richiesta di supporto:", error);
    //     throw error;
    //   }
    // },
  
    // Espansione futura: Funzione per eliminare una richiesta di supporto
    // deleteSupportRequest: async (id) => {
    //   try {
    //     const response = await fetch(`https://api.example.com/support/${id}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     return response.json();
    //   } catch (error) {
    //     console.error("Errore durante l'eliminazione della richiesta di supporto:", error);
    //     throw error;
    //   }
    // },
  };
  
  export default apiService;