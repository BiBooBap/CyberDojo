const CourseDAO = require("../dao/courseDAO");
const CourseEnrollmentDAO = require("../dao/courseEnrollmentDAO");
const CoursesFacade = require("../coursesFacade");

class CourseService {
  // Get courses
  static async getAllCourses(username) {
    return await CoursesFacade.getAllCourses(username);
  }

  static async getLessonsByCourseName(courseName) {
    return await CourseDAO.getLessonsByCourseName(courseName);
  }
}

module.exports = CourseService;