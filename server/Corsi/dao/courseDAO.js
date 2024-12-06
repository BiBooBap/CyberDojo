const { connect } = require("../db");

class CourseDAO {
  static async getAllCourses() {
    const db = await connect();
    return db.collection("courses").find().toArray();
  }

  static async getLessonsByCourseName(courseName) {
    const db = await connect();
    const course = await db.collection("courses").findOne({ name: courseName });
    if (!course) {
      throw new Error("Corso non trovato");
    }
    return course.lessons;
  }
}

module.exports = CourseDAO;