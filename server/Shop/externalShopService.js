const ShopDAO = require("./dao/ShopDAO");

class ExternalShopService {
// Deletes the user's inventory
  static async deleteInventory(user_id) {
    return await ShopDAO.deleteInventory(user_id);
  }
}

module.exports = ExternalShopService;