const { connect } = require("../db");
const { ObjectId } = require("mongodb");

class UserProgressDAO {
  static async getProgressByUsername(username) {
    const db = await connect();
    return db
      .collection("rewards")
      .find({ utente_username: username })
      .toArray();
  }

  static async createProgress(progressData) {
    const db = await connect();
    return db.collection("rewards").insertOne(progressData);
  }

  static async updateProgress(id, updateFields) {
    const db = await connect();
    return db
      .collection("rewards")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
  }

  static async deleteProgress(id) {
    const db = await connect();
    return db.collection("rewards").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = UserProgressDAO;
