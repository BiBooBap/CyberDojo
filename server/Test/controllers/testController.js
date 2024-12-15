const express = require("express");
const TestFacade = require("../facades/testFacade");

const router = express.Router();

class TestController {
  static async getTestsForCourse(req, res) {
    const { courseId } = req.params;
    console.log("courseId CONTROLLER", courseId);
    try {
      const tests = await TestFacade.getTestsForCourse(parseInt(courseId, 10));
      console.log("TEST CONTROLLER", tests);
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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
