const progressService = {
  // Function to get the progress of the user
  getProgress: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/progress/show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei progressi");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel recupero dei progressi:", error);
      throw error;
    }
  },
};

export default progressService;
