const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");


class UserProgressDAO {

  static async findUserByUsername(username) {
    const db = await connect();
    const user = await db.collection("user").findOne({ username });
    return user;
  }

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

  static async deleteProgress(username) {
    const db = await connect();
    return db.collection("rewards").deleteOne({ user_username: username });
  }

  static async getCourseNameById(courseId) {
    const db = await connect();
    const course = await db.collection("courses").findOne({ _id: courseId });
    return course ? course.name : null;
  }

  // Checks if a user has taken at least one test for a course
  static async getTestExistsForUserAndCourse(username, courseId) {
    const db = await connect();
    return await db.collection("rewards").findOne({
      user_username: username,
      course_id: courseId,
    });
  }
}

module.exports = UserProgressDAO;
