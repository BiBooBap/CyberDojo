const loginService = {
    loginByUsername: async (username, password) => {
        try {
          const response = await fetch("http://localhost:3001/auth/login/username", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) {
            throw new Error("Credenziali non valide");
          }
          return await response.json();
        } catch (error) {
          console.error("Errore durante il login:", error);
          throw error;
        }
      },
  
    loginByEmail: async (email, password) => {
      try {
        const response = await fetch("http://localhost:3001/auth/login/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        return await response.json();
      } catch (error) {
        console.error("Errore durante il login:", error);
        throw error;
      }
    },
  };
  
  export default loginService;