import quizService from "./quizService";

class QuizFacade {
  static async getTestsForCourse(courseId) {
    return await quizService.getTestsForCourse(courseId);
  }

  static async evaluateTest(testId, answers) {
    return await quizService.evaluateTest(testId, answers);
  }
}

export default QuizFacade;
