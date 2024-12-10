const express = require("express");
const ShopController = require("../Shop/controllers/shopController");

const router = express.Router();

// Rotta per ottenere la lista degli oggetti disponibili
router.get("/items", ShopController.listItems);

// Rotta per acquistare un oggetto
router.post("/purchase", ShopController.purchaseItem);

// Rotta per ottenere l'inventario di un utente
router.get("/inventory", ShopController.getInventory);

module.exports = router;
