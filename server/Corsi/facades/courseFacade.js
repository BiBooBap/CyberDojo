const CourseService = require("../services/courseService");

class CoursesFacade {
  static async getCoursesUser(username) {
    return await CourseService.getAllCoursesUser(username);
  }

  static async getCoursesGuest() {
    return await CourseService.getAllCoursesGuest();
  }
}

module.exports = CoursesFacade;
