const CourseDAO = require("../dao/courseDAO");
const CourseEnrollmentDAO = require("../dao/courseEnrollmentDAO");

class CourseService {
  // Get courses
  static async getAllCourses(username) {
    const courses = await CourseDAO.getAllCourses();
    console.log("Corsi dal DAO:", courses); // Aggiungi questo log
    let enrolledCourses = [];

    if (username) {
      enrolledCourses = await CourseEnrollmentDAO.getEnrolledCourses(username);
    }

    return courses.map((course) => {
      const enrolledCourse = enrolledCourses.find(
        (enrolled) => enrolled.course_id === course._id
      );
      return {
        id: course._id,
        title: course.name,
        icon: course.course_image,
        difficulty: course.difficulty,
        description: course.description,
        isEnrolled: !!enrolledCourse,
        isCompleted: enrolledCourse ? enrolledCourse.isCompleted : false,
      };
    });
  }

  static async getLessonsByCourseName(courseName) {
    return await CourseDAO.getLessonsByCourseName(courseName);
  }
}

module.exports = CourseService;
