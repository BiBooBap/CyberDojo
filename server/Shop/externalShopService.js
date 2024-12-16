const ShopDAO = require("./dao/shopDAO");

class ExternalShopService {
  // Deletes the user's inventory
  static async deleteInventory(user_id) {
    return await ShopDAO.deleteInventory(user_id);
  }

  // Changes the user's information after a username change
  static async changeInventoryUsername(currentUsername, newUsername) {
    return await ShopDAO.changeInventoryUsername(currentUsername, newUsername);
  }
}

module.exports = ExternalShopService;