const CourseFacade = require("../facades/courseFacade");
const CourseService = require("../services/courseService");

class CourseController {
  static async getCoursesGuest(req, res) {
    try {
      const courses = await CourseFacade.getCoursesGuest();
      res.json(courses);
    } catch (error) {
      console.error("Errore nel recupero dei corsi dell'ospite:", error);
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async getCoursesUser(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: "Utente non autenticato" });
    }

    try {
      const courses = await CourseFacade.getCoursesUser(req.user.username);
      res.json(courses);
    } catch (error) {
      console.error("Errore nel recupero dei corsi:", error);
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

  static async enrollCourse(req, res) {
    const username = req.user.username;
    const { courseId } = req.body;

    try {
      await CourseService.enrollCourse(courseId, username);
      res.status(200).json({ message: "Iscrizione avvenuta con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async getEnrolledCourses(req, res) {
    const { username } = req.user;

    try {
      const courses = await CourseService.getEnrolledCourses(username);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async getCoursePage(req, res) {
    const { courseId } = req.params;
    const username = req.user.username;

    try {
      const course = await CourseService.getCourseById(courseId, username);
      res.json(course);
    } catch (error) {
      console.error("Errore nel recupero dei dettagli del corso:", error);
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
  static async updateUserProgress(req, res) {
    const { courseId, lessonId } = req.body;
    const username = req.user.username;
  
    try {
      await CourseService.updateUserProgress(courseId, lessonId, username );
      res.status(200).json({ message: "Progresso aggiornato con successo." });
    } catch (error) {
      console.error("Errore nell'aggiornamento del progresso:", error);
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = CourseController;
