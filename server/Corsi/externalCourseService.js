const CourseDAO = require("./dao/courseDAO");
const CourseEnrollmentDAO = require("./dao/courseEnrollmentDAO");

class CourseService {
  // Retrieves information about a specific course
  static async getCourseInfo(courseId) {
    return await CourseDAO.getCourseInfo(courseId);
  }

  // Retrieves a list of all courses that a user is enrolled in
  static async getEnrolledCourses(username) {
    return await CourseEnrollmentDAO.getEnrolledCourses(username);
  }
}

module.exports = CourseService;
