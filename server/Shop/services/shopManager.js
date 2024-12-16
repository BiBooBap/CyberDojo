const ShopDAO = require("../dao/shopDAO");

class ShopManager {
  // Retrieve the list of items available in the shop.
  static async listItems() {
    try {
      const items = await ShopDAO.getItems();
      return items;
    } catch (error) {
      console.error("Errore nel recupero degli oggetti:", error);
      throw new Error("Errore nel recupero degli oggetti");
    }
  }

  // Purchase an item from the shop.
  static async purchaseItem(username, itemId) {
    try {
      const selectedItem = await ShopDAO.getItemById(itemId);
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
        type: selectedItem.category,
      });
      if (!inventoryUpdated)
        throw new Error("Errore nell'aggiornamento dell'inventario");

      return { item: selectedItem, message: "Acquisto riuscito con successo" };
    } catch (error) {
      console.error("Errore durante l'acquisto dell'oggetto:", error);
      throw error;
    }
  }

  // Retrieve the inventory of a user.
  static async getInventory(username) {
    try {
      const inventory = await ShopDAO.getInventory(username);
      return inventory;
    } catch (error) {
      console.error("Errore nel recupero dell'inventario:", error);
      throw new Error("Errore nel recupero dell'inventario");
    }
  }

  // Checks if a specific item is present in a user's inventory
  static async isItemInInventory(username, itemId) {
    const items = await ShopDAO.getItems();
    const selectedItem = items.find((i) => i._id.toString() === itemId);
    if (!selectedItem) throw new Error("Item non trovato");

    return await ShopDAO.isItemInInventory(username, selectedItem.name);
  }

  // Retrieves the profile information for a given user
  static async getUserProfile(username) {
    return await ShopDAO.getUserProfile(username);
  }

  // Updates the profile information for a given user
  static async updateUserProfile(username, type, imagePath) {
    return await ShopDAO.updateUserProfile(username, type, imagePath);
  }
}

module.exports = ShopManager;
