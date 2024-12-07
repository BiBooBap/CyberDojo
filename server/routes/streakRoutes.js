const express = require("express");
const StreakController = require("../Premi/controllers/streakController");

const router = express.Router();

router.get("/:username", StreakController.getStreak);
router.post("/update", StreakController.updateStreak);

module.exports = router;