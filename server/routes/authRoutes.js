const express = require("express");
const loginController = require("../Autenticazione/controllers/loginController");
const credentialsController = require("../Autenticazione/controllers/credentialsController");
const StreakController = require("../Premi/controllers/streakController");
const userCourseController = require("../Autenticazione/controllers/userCourseController");
const delController = require("../Autenticazione/controllers/delController");

const router = express.Router();

router.use("/login", loginController);
router.use("/credentials", credentialsController);
router.use("/user-courses", userCourseController);
router.use("/delete-user", delController);

// Update streak on login
router.post("/login", async (req, res, next) => {
  await StreakController.updateStreak(req, res);
  next();
});

module.exports = router;
