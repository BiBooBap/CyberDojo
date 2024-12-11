const ShopDAO = require("../dao/shopDAO");
const { getUserName } = require("../../../client/src/utils/auth");

class ShopManager {
  static async listItems() {
    try {
      const items = await ShopDAO.getItems();
      console.log("Items retrieved:", items);
      return items;
    } catch (error) {
      console.error("Errore nel recupero degli oggetti:", error);
      throw new Error("Errore nel recupero degli oggetti");
    }
  }

  static async purchaseItem(username, itemId) {
    try {
      const items = await ShopDAO.getItems();
      const selectedItem = items.find((i) => i._id.toString() === itemId);
      if (!selectedItem) throw new Error("Item non trovato");

      const pointsDeducted = await ShopDAO.deductPoints(
        username,
        selectedItem.price
      );
      if (!pointsDeducted) throw new Error("Punti insufficienti");

      const inventoryUpdated = await ShopDAO.addToInventory(username, {
        name: selectedItem.name,
        description: selectedItem.description,
        image_path: selectedItem.image_path,
      });
      if (!inventoryUpdated)
        throw new Error("Errore nell'aggiornamento dell'inventario");

      return { item: selectedItem, message: "Acquisto riuscito con successo" };
    } catch (error) {
      console.error("Errore durante l'acquisto dell'oggetto:", error);
      throw error;
    }
  }

  static async getInventory(username) {
    try {
      const inventory = await ShopDAO.getInventory(username);
      console.log("Inventory retrieved:", inventory);
      return inventory;
    } catch (error) {
      console.error("Errore nel recupero dell'inventario:", error);
      throw new Error("Errore nel recupero dell'inventario");
    }
  }

  static async isItemInInventory(username, itemId) {
    const items = await ShopDAO.getItems();
    const selectedItem = items.find((i) => i._id.toString() === itemId);
    if (!selectedItem) throw new Error("Item non trovato");

    return await ShopDAO.isItemInInventory(username, selectedItem.name);
  }
}

module.exports = ShopManager;
