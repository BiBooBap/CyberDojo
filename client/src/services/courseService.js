const corsiService = {

  // Function to update the progress of the user
  updateUserProgress : async (courseId,lessonId ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/courses/update-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, lessonId }),
      });

      if (!response.ok) {
        throw new Error(`Errore nell'aggiornamento del progresso: ${response.statusText}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Errore durante l'aggiornamento del progresso:", error);
      alert("Errore durante l'aggiornamento del progresso.");
    }
  },

  // Function to get courses for guest
  getCoursesGuest: async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:3001/courses/guest", {
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

  // Function to get courses for user
  getCoursesUser: async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await fetch("http://localhost:3001/courses/user", {
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

  // Function to get lessons by course name
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

  // Function to enroll in a course
  enrollCourse: async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'iscrizione al corso");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante l'iscrizione al corso:", error);
      throw error;
    }
  },

  // Function to get enrolled courses
  getEnrolledCourses: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/auth/user-courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei corsi seguiti");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il recupero dei corsi seguiti:", error);
      throw error;
    }
  },

  // Function to get course by id
  getCourseById: async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/courses/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel recupero del corso");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il recupero del corso:", error);
      throw error;
    }
  },
};

export default corsiService;
