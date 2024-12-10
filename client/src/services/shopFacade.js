import shopService from "./shopService";

class ShopFacade {
  static async getItems() {
    return await shopService.getItems();
  }

  static async purchase(username, itemId) {
    return await shopService.purchase(username, itemId);
  }

  static async getUserInventory(username) {
    return await shopService.getUserInventory(username);
  }
}

export default ShopFacade;
