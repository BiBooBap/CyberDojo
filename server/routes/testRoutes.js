const express = require("express");
const TestController = require("../Test/controllers/testController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Route to retrieve all tests associated with a course
router.get("/course/:courseId", TestController.getTestsForCourse);

// Route to evaluate a test
router.post("/evaluate/:testId", authenticate, TestController.evaluateTest);

module.exports = router;
