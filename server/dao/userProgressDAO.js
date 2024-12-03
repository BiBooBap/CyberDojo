const { connect } = require("../db");
const { ObjectId } = require("mongodb");

class UserProgressDAO {
  static async getProgressByUsername(username) {
    const db = await connect();
    return db.collection("premi").find({ utente_username: username }).toArray();
  }

  static async createProgress(progressData) {
    const db = await connect();
    return db.collection("premi").insertOne(progressData);
  }

  static async updateProgress(id, updateFields) {
    const db = await connect();
    return db.collection("premi").updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
  }

  static async deleteProgress(id) {
    const db = await connect();
    return db.collection("premi").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = UserProgressDAO;
