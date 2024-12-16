const TestService = require("../services/testService");

const TestFacade = {

  // Method for obtaining tests for a course
  async getTestsForCourse(courseId) {
    return await TestService.getTestsForCourse(parseInt(courseId, 10));
  },

  // Method for correcting the test
  async evaluateTest(testId, answers, username) {
    return await TestService.evaluateTest(testId, answers, username);
  },
};

module.exports = TestFacade;
