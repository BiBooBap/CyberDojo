const express = require("express");
const CourseController = require("../Corsi/controller/courseController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

router.get("/user", authenticate, CourseController.getCoursesUser);
router.get("/guest", CourseController.getCoursesGuest);
router.get(
  "/lessons/:courseName",
  authenticate,
  CourseController.getLessonsByCourseName
);
router.post("/enroll", authenticate, CourseController.enrollCourse);
router.get(
  "/enrolled-courses",
  authenticate,
  CourseController.getEnrolledCourses
);
router.get("/:courseId", authenticate, CourseController.getCoursePage);

module.exports = router;
