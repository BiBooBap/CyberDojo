const CourseService = require("../Corsi/externalCourseService");

class AuthFacade {
  static async getUserCourses(username) {
    const enrolledCourses = await CourseService.getEnrolledCourses(username);

    if (!enrolledCourses || enrolledCourses.length === 0) {
      throw new Error("L'utente non è iscritto a nessun corso");
    }

    const courses = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseInfo = await CourseService.getCourseInfo(course.course_id);

        const progress = await CourseService.getProgressOfCourse(username, course.course_id);

        return {
          id: course.course_id,
          title: courseInfo.name,
          icon: courseInfo.course_image,
          progress
        };
      })
    );

    return courses;
  }
}

module.exports = AuthFacade;
