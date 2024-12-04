const CourseDAO = require("../dao/courseDAO");

class CourseService {
  static async getAllCourses() {
    return await CourseDAO.getAllCourses();
  }
}

module.exports = CourseService;