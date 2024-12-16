import shopService from "./shopService";

class ShopFacade {
  // Function to retrieve items from the server
  static async getItems() {
    return await shopService.getItems();
  }

  // Function to purchase an item
  static async purchase(itemId) {
    return await shopService.purchaseItem(itemId);
  }

  // Function to retrieve the user's inventory
  static async getUserInventory() {
    return await shopService.getUserInventory();
  }

  // Function to check if an item is in the user's inventory
  static async isItemInInventory(itemId) {
    return await shopService.isItemInInventory(itemId);
  }

  // Function to retrieve the user's profile
  static async getUserProfile() {
    return await shopService.getUserProfile();
  }

  // Function to update the user's profile
  static async updateUserProfile(type, imagePath) {
    return await shopService.updateUserProfile(type, imagePath);
  }
}

export default ShopFacade;
