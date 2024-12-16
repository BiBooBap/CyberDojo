const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");
const ExternalShopService = require("../../Shop/externalShopService");
const ExternalRewardsService = require("../../Premi/externalRewardsService");
const ExternalReportsService = require("../../Segnalazioni/externalReportsService");

class UserDao {
  // Method for finding a user by username
  static async findUserByUsername(username) {
    const db = await connect();
    return db.collection("user").findOne({ username });
  }

  // Method for finding a user by email
  static async findUserByEmail(email) {
    const db = await connect();
    return db.collection("user").findOne({ email });
  }

  // Method for inserting a new user into the database
  static async updateUser(username, updateFields) {
    const db = await connect();
    return db
      .collection("user")
      .updateOne({ username }, { $set: updateFields });
  }

  // Method for finding a user by username
  static async findByUsername(username) {
    const db = await connect();
    return db.collection("user").findOne({ username });
  }

  // Method for change the username of a user
  static async updateUserInDatabase(currentUsername, newUsername) {
    const db = await connect();

    await ExternalShopService.changeInventoryUsername(currentUsername, newUsername);
    await ExternalRewardsService.changeRewardsUsername(currentUsername, newUsername);
    await ExternalReportsService.changeTicketsUsername(currentUsername, newUsername);
  }
}

module.exports = UserDao;
