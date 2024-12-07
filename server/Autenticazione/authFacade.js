const CourseService = require("../Corsi/externalCourseService");
const TestService = require("../Test/externalTestService");

class AuthFacade {
  static async getUserCourses(username) {
    const enrolledCourses = await CourseService.getEnrolledCourses(username);

    if (!enrolledCourses || enrolledCourses.length === 0) {
      throw new Error("L'utente non è iscritto a nessun corso");
    }

    const courses = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseInfo = await CourseService.getCourseInfo(course.course_id);
        const totalLessons = courseInfo.lessons.length;
        const testExists = await TestService.testExistsForUserAndCourse(
          username,
          course.course_id
        );

        const lessonIndex = courseInfo.lessons.findIndex(
          (lesson) => lesson.name === course.lesson_reached
        );

        let progress = (lessonIndex / totalLessons) * 100;
        if (lessonIndex === totalLessons - 1) {
          progress = testExists ? 100 : 90;
        } else {
          progress = Math.ceil(progress);
        }

        return {
          id: course.course_id,
          title: courseInfo.name,
          icon: courseInfo.course_image,
          progress,
          test: testExists ? 1 : 0,
        };
      })
    );

    return courses;
  }
}

module.exports = AuthFacade;
