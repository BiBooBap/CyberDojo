const express = require("express");
const CourseController = require("../Corsi/controller/courseController");

const router = express.Router();

router.use("/", CourseController);

module.exports = router;
