const ShopFacade = require("../facades/shopFacade");

class ShopController {
  static async listItems(req, res) {
    try {
      const items = await ShopFacade.getItems();
      res.json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async purchaseItem(req, res) {
    try {
      const username = req.user.username;
      const { itemId } = req.body;
      const result = await ShopFacade.purchase(username, itemId);
      res
        .status(200)
        .json({ message: "Acquisto completato con successo", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getInventory(req, res) {
    try {
      const username = req.user.username;
      const inventory = await ShopFacade.getUserInventory(username);
      if (!inventory) {
        return res.status(404).json({ error: "Inventario non trovato" });
      }
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async isItemInInventory(req, res) {
    try {
      const username = req.user.username;
      const { itemId } = req.query;
      const isInInventory = await ShopFacade.isItemInInventory(
        username,
        itemId
      );
      res.json({ isInInventory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const username = req.user.username;
      const profile = await ShopFacade.getUserProfile(username);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const username = req.user.username;
      const { type, imagePath } = req.body;

      if (!type || !imagePath) {
        return res
          .status(400)
          .json({ error: "Type e imagePath sono richiesti" });
      }

      const result = await ShopFacade.updateUserProfile(
        username,
        type,
        imagePath
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({
          error: "Utente non trovato o nessun aggiornamento effettuato",
        });
      }

      res
        .status(200)
        .json({ message: "Profilo aggiornato con successo", result });
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento del profilo utente:",
        error
      );
      res
        .status(500)
        .json({ error: "Errore durante l'aggiornamento del profilo utente" });
    }
  }
}

module.exports = ShopController;
