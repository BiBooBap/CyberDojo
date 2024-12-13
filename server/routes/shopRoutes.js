const express = require("express");
const ShopController = require("../Shop/controllers/shopController");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// Rotta per ottenere la lista degli oggetti disponibili
router.get("/items", ShopController.listItems);

// Rotta per acquistare un oggetto
router.post("/purchase", authenticate, ShopController.purchaseItem);

// Rotta per ottenere l'inventario di un utente
router.get("/inventory", authenticate, ShopController.getInventory);

// Rotta per verificare se un item è nell'inventario
router.get(
  "/isItemInInventory",
  authenticate,
  ShopController.isItemInInventory
);

// Rotta per ottenere il profilo dell'utente
router.get("/profile", authenticate, ShopController.getUserProfile);

// Rotta per aggiornare il profilo dell'utente
router.post("/profile", authenticate, ShopController.updateUserProfile);

module.exports = router;
