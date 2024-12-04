const express = require("express");
const CourseEnrollmentController = require("../controllers/courseEnrollmentController");

const router = express.Router();

router.post("/enroll", CourseEnrollmentController.enrollCourse);
router.get("/enrolled-courses", CourseEnrollmentController.getEnrolledCourses);

module.exports = router;