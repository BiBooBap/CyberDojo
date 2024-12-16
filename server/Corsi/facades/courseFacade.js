const CourseService = require("../services/courseService");

class CoursesFacade {
  // Method to get all courses for a user
  static async getCoursesUser(username) {
    return await CourseService.getAllCoursesUser(username);
  }

  // Method to get all courses for a guest
  static async getCoursesGuest() {
    return await CourseService.getAllCoursesGuest();
  }

  // Method to update user progress
  static async updateUserProgress(courseId, lessonId, username) {
    return await CourseService.updateUserProgress(courseId, lessonId, username);
  }
}

module.exports = CoursesFacade;
