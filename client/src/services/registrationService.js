const registrationService = {
  // Function to send a POST request to the server with the registration data
    register: async (userData) => {
      try {
        const response = await fetch("http://localhost:3001/registration/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        return await response.json();
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        throw error;
      }
    },
  };

export default registrationService;