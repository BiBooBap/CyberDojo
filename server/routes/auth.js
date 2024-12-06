const express = require("express");
const loginController = require("../Autenticazione/controllers/loginController");
const credentialsController = require("../Autenticazione/controllers/credentialsController");
const StreakController = require("../Premi/controllers/streakController");

const router = express.Router();

router.use("/login", loginController);
router.use("/credentials", credentialsController);

// Update streak on login
router.post("/login", async (req, res, next) => {
    await StreakController.updateStreak(req, res);
    next();
  });

module.exports = router;