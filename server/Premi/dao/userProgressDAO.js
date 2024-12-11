const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");

class UserProgressDAO {
  static async getProgressByUsername(username) {
    const db = await connect();
    return db.collection("rewards").find({ user_username: username }).toArray();
  }

  static async createProgress(progressData) {
    const db = await connect();
    return db.collection("rewards").insertOne(progressData);
  }

  static async updateProgress(id, updateFields) {
    const db = await connect();
    return db
      .collection("rewards")
      .updateOne({ _id: id }, { $set: updateFields });
  }

  static async deleteProgress(id) {
    const db = await connect();
    return db.collection("rewards").deleteOne({ _id: id });
  }

  static async getCourseNameById(courseId) {
    const db = await connect();
    const course = await db.collection("courses").findOne({ _id: courseId });
    return course ? course.name : null;
  }
}

module.exports = UserProgressDAO;
