import corsiService from "./courseService";

class courseFacade {
  static async getAllCoursesGuest() {
    return await corsiService.getCoursesGuest();
  }

  static async getAllCoursesUser() {
    return await corsiService.getCoursesUser();
  }

  static async enrollCourse(courseId) {
    return await corsiService.enrollCourse(courseId);
  }

  static async getEnrolledCourses() {
    return await corsiService.getEnrolledCourses();
  }

  static async getLessonsByCourseName(courseName, token) {
    return await corsiService.getLessonsByCourseName(courseName, token);
  }
  
  static async getCourseById(courseId, username) {
    return await corsiService.getCourseById(courseId, username);
  }
}

export default courseFacade;
