const ShopManager = require("../services/shopManager");

class ShopFacade {
  async getItems() {
    return await ShopManager.listItems();
  }

  async purchase(username, itemId) {
    return await ShopManager.purchaseItem(username, itemId);
  }

  async getUserInventory(username) {
    return await ShopManager.getInventory(username);
  }

  async isItemInInventory(username, itemId) {
    return await ShopManager.isItemInInventory(username, itemId);
  }

  async getUserProfile(username) {
    return await ShopManager.getUserProfile(username);
  }

  async updateUserProfile(username, type, imagePath) {
    return await ShopManager.updateUserProfile(username, type, imagePath);
  }
}

module.exports = new ShopFacade();
