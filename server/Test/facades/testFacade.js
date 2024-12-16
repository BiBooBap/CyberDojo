const TestService = require("../services/testService");

const TestFacade = {

  async getTestsForCourse(courseId) {
    return await TestService.getTestsForCourse(parseInt(courseId, 10));
  },

  async evaluateTest(testId, answers, username) {
    return await TestService.evaluateTest(testId, answers, username);
  },
};

module.exports = TestFacade;
