const CourseEnrollmentService = require("../services/courseEnrollmentService");

class CourseEnrollmentController {
  static async enrollCourse(req, res) {
    const username = req.user.username;
    const courseId = req.body;

    try {
      await CourseEnrollmentService.enrollCourse(courseId, username);
      res.status(200).json({ message: "Iscrizione avvenuta con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
  static async getEnrolledCourses(req, res) {
    const { username } = req.user;

    try {
      const courses = await CourseEnrollmentService.getEnrolledCourses(
        username
      );
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = CourseEnrollmentController;
