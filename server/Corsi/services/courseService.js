const CourseDAO = require("../dao/courseDAO");
const RewardsService = require("../../Premi/externalRewardsService");

class CourseService {
  static async getAllCoursesGuest() {
    return await CourseDAO.getAllCourses();
  }

  static async getAllCoursesUser(username) {
    const courses = await CourseDAO.getAllCourses();
    let enrolledCourses = [];

    if (username) {
      enrolledCourses = await CourseDAO.getEnrolledCourses(username);
    }

    return courses.map((course) => {
      const enrolledCourse = enrolledCourses.find(
        (enrolled) => enrolled.course_id === course._id
      );
      return {
        _id: course._id,
        name: course.name,
        description: course.description,
        difficulty: course.difficulty,
        course_image: course.course_image,
        isEnrolled: !!enrolledCourse,
        isCompleted: enrolledCourse ? enrolledCourse.isCompleted : false,
      };
    });
  }

  /*
  static async getAllCourses(username) {
    const courses = await CourseDAO.getAllCourses();
    let enrolledCourses = [];

    if (username) {
      enrolledCourses = await CourseDAO.getEnrolledCourses(username);
    }

    return await Promise.all(
      courses.map(async (course) => {
        let isEnrolled = false;
        let testExists = false;

        if (username) {
          isEnrolled = enrolledCourses.some(
            (enrolledCourse) => enrolledCourse.course_id === course._id
          );
          testExists = await RewardsService.getTestExistsForUserAndCourse(
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
*/

  static async getLessonsByCourseName(courseName) {
    return await CourseDAO.getLessonsByCourseName(courseName);
  }

  static async enrollCourse(courseId, username) {
    return await CourseDAO.enrollCourse(courseId, username);
  }

  static async getProgressOfCourse(username, course_id) {
    const corsi_utente = await CourseDAO.getEnrolledCourses(username);
    const corso_utente = corsi_utente.find(
      (corsi_utente) => corsi_utente.course_id === course_id
    );

    const course = await CourseDAO.getCourseInfo(course_id);
    const totalLessons = course.lessons.length;

    const testExists = await RewardsService.getTestExistsForUserAndCourse(
      username,
      course._id
    );

    const normalizedLessonReached = corso_utente.lesson_reached
      .trim()
      .toLowerCase();
    const lessonIndex = course.lessons.findIndex(
      (lesson) => lesson.name.trim().toLowerCase() === normalizedLessonReached
    );

    let progress = (lessonIndex / totalLessons) * 100;
    if (lessonIndex + 1 === totalLessons && testExists) {
      progress = 100;
    } else {
      if (lessonIndex == 0) {
        progress = 0;
      } else {
        progress = Math.ceil(progress);
      }
    }

    return progress;
  }
}

module.exports = CourseService;
