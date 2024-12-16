const ShopManager = require("../services/shopManager");

class ShopFacade {
  // Returns all the items in the shop
  async getItems() {
    return await ShopManager.listItems();
  }

  // Handles the purchase of an item by a user.
  async purchase(username, itemId) {
    return await ShopManager.purchaseItem(username, itemId);
  }

  // Returns the inventory of a user
  async getUserInventory(username) {
    return await ShopManager.getInventory(username);
  }

  // Checks if a specific item is present in a user's inventory
  async isItemInInventory(username, itemId) {
    return await ShopManager.isItemInInventory(username, itemId);
  }

  // Retrieves the profile information for a given user
  async getUserProfile(username) {
    return await ShopManager.getUserProfile(username);
  }

  // Updates the profile information for a given user
  async updateUserProfile(username, type, imagePath) {
    return await ShopManager.updateUserProfile(username, type, imagePath);
  }
}

module.exports = new ShopFacade();
