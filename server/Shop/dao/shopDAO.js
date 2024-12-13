const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");

class ShopDAO {
  static async getItems() {
    const db = await connect();
    return db.collection("shop_items").find().toArray();
  }

  static async getItemById(itemId) {
    const db = await connect();
    const item = await db
      .collection("shop_items")
      .findOne({ _id: parseInt(itemId) });
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }
  static async deductPoints(userUsername, cost) {
    const db = await connect();
    const result = await db.collection("user").updateOne(
      { username: userUsername, points: { $gte: cost } }, // Verifica che i punti siano sufficienti
      { $inc: { points: -cost } } // Deduce i punti
    );
    return result.matchedCount > 0; // Ritorna true se l'operazione è riuscita
  }

  static async addToInventory(userUsername, item) {
    const db = await connect();
    const result = await db.collection("inventory").updateOne(
      { user_username: userUsername }, // Trova l'inventario dell'utente
      { $push: { items: item } }, // Aggiunge l'oggetto agli items
      { upsert: true } // Crea l'inventario se non esiste
    );
    return result.modifiedCount > 0 || result.upsertedCount > 0; // Ritorna true se l'operazione è riuscita
  }

  static async getInventory(userUsername) {
    const db = await connect();
    return db.collection("inventory").findOne({ user_username: userUsername });
  }

  static async isItemInInventory(userUsername, itemName) {
    const db = await connect();
    console.log(
      `Controllo inventario per l'utente: ${userUsername}, item: ${itemName}`
    );
    const inventory = await db
      .collection("inventory")
      .findOne({ user_username: userUsername, "items.name": itemName });
    return inventory !== null;
  }

  static async deleteInventory(userUsername) {
    const db = await connect();
    return db
      .collection("inventory")
      .deleteOne({ user_username: userUsername });
  }

  static async getUserProfile(username) {
    const db = await connect();
    return db
      .collection("user")
      .findOne(
        { username },
        { projection: { avatar: 1, border: 1, user_title: 1 } }
      );
  }

  static async updateUserProfile(username, type, imagePath) {
    const db = await connect();
    const updateField = {};
    updateField[type] = imagePath;
    const result = await db
      .collection("user")
      .updateOne({ username }, { $set: updateField });
    return result.modifiedCount > 0;
  }
}

module.exports = ShopDAO;
