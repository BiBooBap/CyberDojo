const { connect } = require("../db");

class CourseDAO {
  static async getAllCourses() {
    const db = await connect();
    return db.collection("courses").find().toArray();
  }
}

module.exports = CourseDAO;