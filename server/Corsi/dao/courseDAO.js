const { connect } = require("../../../database/db");

class CourseDAO {
  static async getAllCourses() {
    const db = await connect();
    const courses = await db.collection("courses").find().toArray();
    console.log("Corsi dal database:", courses);
    return courses;
  }

  static async getLessonsByCourseName(courseName) {
    const db = await connect();
    const course = await db.collection("courses").findOne({ name: courseName });
    if (!course) {
      throw new Error("Corso non trovato");
    }
    return course.lessons;
  }

  static async getCourseInfo(courseId) {
    const db = await connect();
    return db.collection("courses").findOne({ _id: courseId });
  }

  static async getEnrolledCourses(username) {
    const db = await connect();
    const user = await db.collection("user").findOne({ username });
    if (!user) {
      throw new Error("Utente non trovato");
    }
    return user.enrolled_courses;
  }
}

module.exports = CourseDAO;
