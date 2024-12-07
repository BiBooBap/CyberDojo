const { connect } = require("../../../database/db");

class CourseEnrollmentDAO {
  static async enrollCourse(username, courseId) {
    const db = await connect();
    return db
      .collection("users")
      .updateOne(
        { username },
        {
          $addToSet: {
            enrolled_courses: { course_id: courseId, lesson_reached: "" },
          },
        }
      );
  }
  static async getEnrolledCourses(username) {
    const db = await connect();
    const user = await db.collection("users").findOne({ username });
    return user ? user.enrolled_courses : [];
  }
}

module.exports = CourseEnrollmentDAO;
