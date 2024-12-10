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
      const { username, itemId } = req.body;
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
      const { username } = req.query;
      const inventory = await ShopFacade.getUserInventory(username);
      if (!inventory) {
        return res.status(404).json({ error: "Inventario non trovato" });
      }
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ShopController;
