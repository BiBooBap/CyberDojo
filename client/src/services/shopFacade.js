import shopService from "./shopService";

class ShopFacade {
  static async getItems() {
    return await shopService.getItems();
  }

  static async purchase(itemId) {
    return await shopService.purchaseItem(itemId);
  }

  static async getUserInventory() {
    return await shopService.getUserInventory();
  }

  static async isItemInInventory(itemId) {
    return await shopService.isItemInInventory(itemId);
  }

  static async getUserProfile() {
    return await shopService.getUserProfile();
  }

  static async updateUserProfile(type, imagePath) {
    console.log("ShopFacade updateUserProfile", type, imagePath);
    return await shopService.updateUserProfile(type, imagePath);
  }
}

export default ShopFacade;
