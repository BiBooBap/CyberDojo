const express = require("express");
const TestController = require("../Test/controllers/testController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Rotta per recuperare tutti i test associati a un corso
router.get("/course/:courseId", TestController.getTestsForCourse);

// Rotta per valutare un test
router.post("/evaluate/:testId", authenticate, TestController.evaluateTest);

module.exports = router;
