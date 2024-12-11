const express = require("express");
const UserProgressController = require("../Premi/controllers/userProgressController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Route to get user progress
router.get("/show", authenticate, UserProgressController.getProgress);

// Route to add user progress
router.post("/add", authenticate, UserProgressController.addProgress);

// Route to update user progress
router.patch("/update", authenticate, UserProgressController.updateProgress);

// Route to delete user progress
router.delete("/delete", authenticate, UserProgressController.deleteProgress);

module.exports = router;
