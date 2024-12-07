const express = require("express");
const UserProgressController = require("../Premi/controllers/userProgressController");

const router = express.Router();

router.get("/progress/:username", UserProgressController.getProgress);
router.post("/progress", UserProgressController.addProgress);
router.patch("/progress/:id", UserProgressController.updateProgress);
router.delete("/progress/:id", UserProgressController.deleteProgress);

module.exports = router;
