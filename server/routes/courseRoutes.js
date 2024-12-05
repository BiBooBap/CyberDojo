const express = require("express");
const CourseController = require("../controllers/courseController");

const router = express.Router();

router.get("/", CourseController.getAllCourses);
router.get("/lessons/:courseName", CourseController.getLessonsByCourseName);

module.exports = router;