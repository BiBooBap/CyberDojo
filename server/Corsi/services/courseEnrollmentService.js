const CourseEnrollmentDAO = require("../dao/courseEnrollmentDAO");

class CourseEnrollmentService {
  static async enrollCourse(courseId, username) {
    return await CourseEnrollmentDAO.enrollCourse(courseId, username);
  }
  static async getEnrolledCourses(username) {
    return await CourseEnrollmentDAO.getEnrolledCourses(username);
  }
}

module.exports = CourseEnrollmentService;
