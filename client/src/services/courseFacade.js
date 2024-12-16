import corsiService from "./courseService";

class courseFacade {
  // Function to get all courses
  static async getAllCoursesGuest() {
    return await corsiService.getCoursesGuest();
  }

  // Function to get all courses for a user
  static async getAllCoursesUser() {
    return await corsiService.getCoursesUser();
  }

  // Function to enroll in a course
  static async enrollCourse(courseId) {
    return await corsiService.enrollCourse(courseId);
  }

  // Function to get all enrolled courses
  static async getEnrolledCourses() {
    return await corsiService.getEnrolledCourses();
  }

  // Function to get all lessons for a course
  static async getLessonsByCourseName(courseName, token) {
    return await corsiService.getLessonsByCourseName(courseName, token);
  }

  // Function to get all course for id
  static async getCourseById(courseId, username) {
    return await corsiService.getCourseById(courseId, username);
  }

  // Function to update user progress
  static async updateUserProgress(courseId, lessonId) {
    return await corsiService.updateUserProgress(courseId, lessonId);
  }
}

export default courseFacade;
