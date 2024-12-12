const express = require("express");
const CourseController = require("../Corsi/controller/courseController");
const CourseEnrollmentController = require("../Corsi/controller/courseEnrollmentController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

router.post("/enroll", authenticate, CourseEnrollmentController.enrollCourse);
router.get(
  "/enrolled-courses",
  authenticate,
  CourseEnrollmentController.getEnrolledCourses
);

router.use("/", CourseController);

module.exports = router;
