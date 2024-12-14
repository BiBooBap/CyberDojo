const CourseService = require("../services/courseService");

class CoursesFacade {
  static async getCoursesUser(username) {
    return await CourseService.getAllCoursesUser(username);
  }

  static async getCoursesGuest() {
    return await CourseService.getAllCoursesGuest();
  }
  static async updateUserProgress(courseId, lessonId, username) {
    return await CourseService.updateUserProgress(courseId, lessonId, username);
  }
}

module.exports = CoursesFacade;
