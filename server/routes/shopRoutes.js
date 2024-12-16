const express = require("express");
const ShopController = require("../Shop/controllers/shopController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Route to get the list of available objects
router.get("/items", ShopController.listItems);

// Route to purchase an item
router.post("/purchase", authenticate, ShopController.purchaseItem);

// Route to get a user's inventory
router.get("/inventory", authenticate, ShopController.getInventory);

// Route to check if an item is in the inventory
router.get(
  "/isItemInInventory",
  authenticate,
  ShopController.isItemInInventory
);

// Route to get the user's profile
router.get("/profile", authenticate, ShopController.getUserProfile);

// Route to update the user's profile
router.post("/profile", authenticate, ShopController.updateUserProfile);

module.exports = router;
