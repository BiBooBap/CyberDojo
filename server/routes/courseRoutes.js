const express = require("express");
const CourseController = require("../Corsi/controller/courseController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Defining the route for getting all courses for user
router.get("/user", authenticate, CourseController.getCoursesUser);

// Defining the route for getting all courses for guest
router.get("/guest", CourseController.getCoursesGuest);

// Defining the route for getting all lessons for a course
router.get(
  "/lessons/:courseName",
  authenticate,
  CourseController.getLessonsByCourseName
);

// Defining the route for enrolling in a course
router.post("/enroll", authenticate, CourseController.enrollCourse);

// Defining the route for getting enrolled courses
router.get(
  "/enrolled-courses",
  authenticate,
  CourseController.getEnrolledCourses
);

// Defining the route for getting course page
router.get("/:courseId", authenticate, CourseController.getCoursePage);

// Defining the route for updating user progress
router.post("/update-progress", authenticate, CourseController.updateUserProgress);


module.exports = router;
