const express = require("express");
const loginController = require("../Autenticazione/controllers/loginController");
const credentialsController = require("../Autenticazione/controllers/credentialsController");
const userCourseController = require("../Autenticazione/controllers/userCourseController");
const delController = require("../Autenticazione/controllers/delController");

const router = express.Router();
// Define the routes for the login
router.use("/login", loginController);

// Define the routes for the credentials
router.use("/credentials", credentialsController);

// Define the routes for the user-courses
router.use("/user-courses", userCourseController);

// Define the routes for the delete user
router.use("/delete-user", delController);

module.exports = router;
