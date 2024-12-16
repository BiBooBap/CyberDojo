const TestFacade = require("../facades/testFacade");

class TestController {
  // Method for obtaining tests for a course
  static async getTestsForCourse(req, res) {
    const { courseId } = req.params;
    try {
      const tests = await TestFacade.getTestsForCourse(parseInt(courseId, 10));
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Method for correcting the test
  static async evaluateTest(req, res) {
    const { testId } = req.params;
    const { answers } = req.body;
    const username = req.user.username;

    try {
      const result = await TestFacade.evaluateTest(testId, answers, username);
      res.status(200).json({
        message: "Test valutato con successo",
        score: result.score,
        points: result.points,
        feedback: result.feedback,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TestController;
