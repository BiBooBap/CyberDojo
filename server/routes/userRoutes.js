const express = require("express");
const UserController = require("../Premi/controllers/userProgressController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Route to get user points
router.get("/points", authenticate, UserController.getPoints);

module.exports = router;