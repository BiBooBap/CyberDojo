const userService = {
  // Fetches the user points from the backend
    getUserPoints: async () => {
        const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3001/user/points", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Errore nel recupero dei punti utente");
        }
        const data = await response.json();
        return data.points;
      } catch (error) {
        console.error("Errore nel recupero dei punti utente:", error);
        throw error;
      }
    },
  };

export default userService;