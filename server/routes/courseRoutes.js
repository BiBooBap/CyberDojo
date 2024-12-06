const express = require("express");
const CourseController = require("../Corsi/controllers/courseController");

const router = express.Router();

router.use("/", CourseController);

module.exports = router;