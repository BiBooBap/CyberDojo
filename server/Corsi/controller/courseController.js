const express = require("express");
const CourseService = require("../services/courseService");
const authenticate = require("../../Middleware/authenticate");

const router = express.Router();

// Get courses
  router.get("/", authenticate, async (req, res) => {
    const username = req.user ? req.user.username : null;

    try {
      const courses = await CourseService.getAllCourses(username);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  })

  router.get("/lessons/:courseName", authenticate, async (req, res) => {
    const { courseName } = req.params;
    try {
      const lessons = await CourseService.getLessonsByCourseName(courseName);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

module.exports = router;