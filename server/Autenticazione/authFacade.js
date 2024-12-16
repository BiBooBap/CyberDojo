const CourseService = require("./services/authService");

class AuthFacade {
  // Method for obtaining the courses the user is enrolled in
  static async getUserCourses(username) {
    return await CourseService.getUserCourses(username);
  }
}

module.exports = AuthFacade;
