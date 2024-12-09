const { connect } = require("../../../database/db");

class CourseEnrollmentDAO {
  static async enrollCourse(username, courseId) {
    const db = await connect();
    return db.collection("users").updateOne(
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
    const user = await db.collection("user").findOne({ username });
    return user.enrolled_courses.map((course) => ({
      course_id: course.course_id,
      isCompleted: course.lesson_reached === "completed",
    }));
  }
}

module.exports = CourseEnrollmentDAO;
