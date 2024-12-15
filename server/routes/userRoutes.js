const express = require("express");
const UserController = require("../Premi/controllers/userProgressController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Rotta per ottenere i punti dell'utente
router.get("/points", authenticate, UserController.getPoints);

module.exports = router;