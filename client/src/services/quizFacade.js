import quizService from "./quizService";

class QuizFacade {
  // Function to get the tests for a course
  static async getTestsForCourse(courseId) {
    return await quizService.getTestsForCourse(courseId);
  }

  // Function to correct the test
  static async evaluateTest(testId, answers) {
    return await quizService.evaluateTest(testId, answers);
  }
}

export default QuizFacade;
