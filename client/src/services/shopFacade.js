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
}

export default ShopFacade;
