const { connect } = require("../../database/db");
const { ObjectId } = require("mongodb");

class UserDao {
  static async findUserByUsername(username) {
    const db = await connect();
    return db.collection("user").findOne({ username });
  }

  static async findUserByEmail(email) {
    const db = await connect();
    return db.collection("user").findOne({ email });
  }

  static async updateUser(username, updateFields) {
    const db = await connect();
    return db.collection("user").updateOne(
      { username },
      { $set: updateFields }
    );
  }

}

module.exports = UserDao;