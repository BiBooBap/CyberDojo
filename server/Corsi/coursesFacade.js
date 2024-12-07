const CourseDAO = require("./dao/courseDAO");
const CourseEnrollmentDAO = require("./dao/courseEnrollmentDAO");
const TestService = require("../Test/externalTestService");

class CourseService {
  static async getAllCourses(username) {
    const courses = await CourseDAO.getAllCourses();
    let enrolledCourses = [];

    if (username) {
      enrolledCourses = await CourseEnrollmentDAO.getEnrolledCourses(username);
    }

    return await Promise.all(
      courses.map(async (course) => {
        let isEnrolled = false;
        let testExists = false;

        if (username) {
          isEnrolled = enrolledCourses.some(
            (enrolledCourse) => enrolledCourse.course_id === course._id
          );
          testExists = await TestService.getTestExistsForUserAndCourse(
            username,
            course._id
          );
        }

        return {
          id: course._id,
          title: course.name,
          icon: course.course_image,
          difficulty: course.difficulty,
          description: course.description,
          isEnrolled,
          test: testExists,
        };
      })
    );
  }
}

module.exports = CoursesFacade;
