const CourseDAO = require("../dao/courseDAO");

class CourseService {
  static async getAllCourses() {
    return await CourseDAO.getAllCourses();
  }

  static async getLessonsByCourseName(courseName) {
    return await CourseDAO.getLessonsByCourseName(courseName);
  }
}

module.exports = CourseService;