const CourseService = require("../services/courseService");

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const courses = await CourseService.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = CourseController;