const corsiService = {
  getCourses: async (token) => {
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

      const response = await fetch("http://localhost:3001/courses", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(
          `Errore nel recupero dei corsi COURSESERVICE: ${response.statusText}`
        );
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("La risposta dell'API non è valida");
      }
      return data;
    } catch (error) {
      console.error("Errore durante il recupero dei corsi:", error);
      throw error;
    }
  },

  getLessonsByCourseName: async (courseName, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        `http://localhost:3001/courses/lessons/${courseName}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(
          `Errore nel recupero delle lezioni del corso: ${response.statusText}`
        );
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("La risposta dell'API non è valida");
      }
      return data;
    } catch (error) {
      console.error(
        "Errore durante il recupero delle lezioni del corso:",
        error
      );
      throw error;
    }
  },
};

export default corsiService;
