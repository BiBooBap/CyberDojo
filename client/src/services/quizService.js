const quizService = {
  // Function to get the tests for a course
  getTestsForCourse: async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/tests/course/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel recupero dei test");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero dei test:", error);
      throw error;
    }
  },

  // Function to correct the test
  evaluateTest: async (testId, answers) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/tests/evaluate/${testId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers }),
        }
      );
      if (!response.ok) {
        throw new Error("Errore nella valutazione del test");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nella valutazione del test:", error);
      throw error;
    }
  },
};

export default quizService;
