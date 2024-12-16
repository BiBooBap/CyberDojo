const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");

class ShopDAO {
  // Returns all the items in the shop
  static async getItems() {
    const db = await connect();
    return db.collection("shop_items").find().toArray();
  }

  // Returns the item with the specified ID
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

  // Deducts points from the user if he has enough points.
  static async deductPoints(userUsername, cost) {
    const db = await connect();
    const result = await db.collection("user").updateOne(
      { username: userUsername, points: { $gte: cost } }, // Check that the points are sufficient
      { $inc: { points: -cost } } // Deducts points
    );
    return result.matchedCount > 0; // Returns true if the operation was successful
  }

  // Returns the item with the specified name
  static async addToInventory(userUsername, item) {
    const db = await connect();
    const inventory = await db.collection("inventory").findOne({ user_username: userUsername });
    let  result = null;

    if(!inventory) {
      // Inventory doesn't exist, create it
      const lastInventory = await db.collection("inventory")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .project({ _id: 1 })
    .toArray();

    var lastId = lastInventory.length > 0 ? lastInventory[0]._id : 0;
    const newId = lastId + 1;
    result = await db.collection("inventory").insertOne({ _id: newId, user_username: userUsername, items:  [item] });
    return result.acknowledged; // Returns true if the operation was successful
    }

    result = await db.collection("inventory").updateOne(
      { user_username: userUsername },
      { $push: { items: item } },
    );
    return result.modifiedCount > 0 || result.upsertedCount > 0; // Returns true if the operation was successful
  }

  // Returns the item of the specified user
  static async getInventory(userUsername) {
    const db = await connect();
    return db.collection("inventory").findOne({ user_username: userUsername });
  }

  // Checks if a specific item is present in a user's inventory
  static async isItemInInventory(userUsername, itemName) {
    const db = await connect();
    const inventory = await db
      .collection("inventory")
      .findOne({ user_username: userUsername, "items.name": itemName });
    return inventory !== null;
  }

  // Deletes an item from a user's inventory
  static async deleteInventory(userUsername) {
    const db = await connect();
    return db
      .collection("inventory")
      .deleteOne({ user_username: userUsername });
  }

  // Retrieves the profile information for a given user
  static async getUserProfile(username) {
    const db = await connect();
    return db
      .collection("user")
      .findOne(
        { username },
        { projection: { avatar: 1, border: 1, user_title: 1 } }
      );
  }

  // Updates the profile information for a given user
  static async updateUserProfile(username, type, imagePath) {
    const db = await connect();
    const updateField = {};
    updateField[type] = imagePath;
    const result = await db
      .collection("user")
      .updateOne({ username }, { $set: updateField });
    return result.modifiedCount > 0;
  }

  // Change the username in the inventory collection
  static async changeInventoryUsername(currentUsername, newUsername) {
    const db = await connect();

    return await db.collection("inventory").updateOne(
      { user_username: currentUsername },
      { $set: { user_username: newUsername } }
    );
  }
}

module.exports = ShopDAO;
