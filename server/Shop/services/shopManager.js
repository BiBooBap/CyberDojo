const ShopDAO = require("../dao/shopDAO");

class ShopManager {
  static async listItems() {
    return await ShopDAO.getItems();
  }

  static async purchaseItem(username, itemId) {
    const item = await ShopDAO.getItems();
    const selectedItem = item.find((i) => i._id.toString() === itemId);
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
  }

  static async getInventory(username) {
    return await ShopDAO.getInventory(username);
  }
}

module.exports = ShopManager;
