const { connect } = require("../../../database/db");

class CourseDAO {
  static async getAllCourses() {
    const db = await connect();
    const courses = await db.collection("courses").find().toArray();
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

  static async enrollCourse(courseId, username) {
    const db = await connect();
    const lezioni = await CourseDAO.getCourseInfo(courseId);

    return db.collection("user").updateOne(
      { username },
      {
        $push: {
          enrolled_courses: {
            course_id: courseId,
            // Insert the first lesson of that course
            lesson_reached: lezioni.lessons[0].name,
          },
        },
      }
    );
  }

  static async getEnrolledCourses(username) {
    const db = await connect();
    const user = await db.collection("user").findOne({ username });
    if (!user) {
      throw new Error("Utente non trovato");
    }
    return user.enrolled_courses;
  }

  static async getEnrollment(username, courseId) {
    const db = await connect();
    const user = await db.collection("user").findOne({ username });
    if (!user) {
      throw new Error("Utente non trovato");
    }
    const course = user.enrolled_courses.find(enrollment => enrollment.course_id === courseId);
    return course;
  }

static async updateUserProgress(courseId, newLessonId, username) {
  const db = await connect();
  try {
    // Recupera il corso per ottenere l'ordine delle lezioni
    const course = await CourseDAO.getCourseInfo(parseInt(courseId, 10));
    if (!course) {
      throw new Error('Corso non trovato');
    }

    // Trova l'indice della nuova lezione
    const newLessonIndex = course.lessons.findIndex(lesson => lesson.name === newLessonId);
    if (newLessonIndex === -1) {
      throw new Error('Lezione non trovata nel corso');
    }

    let userLesson_reached = await CourseDAO.getEnrollment(username, parseInt(courseId, 10));
    const currentLessonIndex = course.lessons.findIndex(lesson => lesson.name === userLesson_reached.lesson_reached);
      

    if (newLessonIndex > currentLessonIndex) {
    // Aggiorna al nuovo progresso
    userLesson_reached.lesson_reached = newLessonId;

    await db.collection("user").updateOne(
      { username, "enrolled_courses.course_id": parseInt(courseId, 10) },
      { $set: { "enrolled_courses.$.lesson_reached": newLessonId } }
    );

    userLesson_reached.lesson_reached = newLessonId;

    return userLesson_reached;
  }
  } catch (error) {
    console.error('Errore in updateUserProgress:', error);
    throw error;
  }
}

}
module.exports = CourseDAO;
