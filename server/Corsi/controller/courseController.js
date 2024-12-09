const express = require("express");
const CourseService = require("../services/courseService");
const authenticate = require("../../Middleware/authenticate");

const router = express.Router();

// Get courses
router.get("/", authenticate, async (req, res) => {
  console.log("Richiesta ricevuta per /api/courses");
  const username = req.user ? req.user.username : null;

  try {
    const courses = await CourseService.getAllCourses(username);
    console.log("Corsi recuperati:", courses);
    res.json(courses);
  } catch (error) {
    console.error("Errore nel recupero dei corsi:", error);
    res.status(500).json({ message: "Errore interno del server", error });
  }
});

router.get("/lessons/:courseName", authenticate, async (req, res) => {
  const { courseName } = req.params;
  try {
    const lessons = await CourseService.getLessonsByCourseName(courseName);
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
