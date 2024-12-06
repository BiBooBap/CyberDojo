const CourseEnrollmentService = require("../services/courseEnrollmentService");

class CourseEnrollmentController {
  static async enrollCourse(req, res) {
    const { username } = req.user; // Assuming the user is authenticated and the middleware adds the user to the request
    const { courseId } = req.body;

    try {
      await CourseEnrollmentService.enrollCourse(username, courseId);
      res.status(200).json({ message: "Iscrizione avvenuta con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
  static async getEnrolledCourses(req, res) {
    const { username } = req.user; // Assuming the user is authenticated and the middleware adds the user to the request

    try {
      const courses = await CourseEnrollmentService.getEnrolledCourses(username);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = CourseEnrollmentController;