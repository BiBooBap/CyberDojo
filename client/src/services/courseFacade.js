import corsiService from "./courseService";

const courseFacade = {
  getAllCourses: async (token) => {
    return await corsiService.getCourses(token);
  },
  enrollCourse: async (courseId, token) => {
    try {
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
};

export default courseFacade;