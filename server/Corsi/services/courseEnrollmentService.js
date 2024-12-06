const CourseEnrollmentDAO = require("../dao/courseEnrollmentDAO");

class CourseEnrollmentService {
  static async enrollCourse(username, courseId) {
    return await CourseEnrollmentDAO.enrollCourse(username, courseId);
  }
  static async getEnrolledCourses(username) {
    return await CourseEnrollmentDAO.getEnrolledCourses(username);
  }
}

module.exports = CourseEnrollmentService;