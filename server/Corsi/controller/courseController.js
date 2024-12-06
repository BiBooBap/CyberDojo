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

  static async getLessonsByCourseName(req, res) {
    const { courseName } = req.params;
    try {
      const lessons = await CourseService.getLessonsByCourseName(courseName);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CourseController;