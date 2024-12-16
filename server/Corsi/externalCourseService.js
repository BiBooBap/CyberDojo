const CourseDAO = require("./dao/courseDAO");
const CourseServices = require("./services/courseService");

class CourseService {
  // Retrieves information about a specific course
  static async getCourseInfo(courseId) {
    return await CourseDAO.getCourseInfo(courseId);
  }

  // Retrieves a list of all courses that a user is enrolled in
  static async getEnrolledCourses(username) {
    return await CourseDAO.getEnrolledCourses(username);
  }

  // Retrieves the user's progress in a course
  static async getProgressOfCourse(username, course_id) {
    return await CourseServices.getProgressOfCourse(username, course_id);
  }
}

module.exports = CourseService;
