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
}

module.exports = new ShopFacade();
