const { connect } = require("../../../database/db");

class TestDAO {
  // Recupera tutti i test associati a un corso
  async getTestsByCourse(courseId) {
    console.log("Sto nel FruttoDAO");
    const db = await connect();
    const tests = await db
      .collection("tests")
      .find({ course_id: courseId })
      .toArray();

    console.log(`Tests found for course ${courseId}:`, tests);
    return tests;
  }

  // Aggiunge un risultato (ricompensa) alla collezione rewards
  async addReward(reward) {
    const db = await connect();
    const result = await db.collection("rewards").insertOne(reward);
    return result.insertedId;
  }

  // Recupera il premio esistente per un utente e un corso specifico
  async getRewardByUserAndCourse(username, courseId) {
    const db = await connect();
    return await db.collection("rewards").findOne({
      user_username: username,
      course_id: courseId,
    });
  }

  // Aggiorna il premio esistente
  async updateReward(rewardId, updateFields) {
    const db = await connect();
    return await db
      .collection("rewards")
      .updateOne({ _id: rewardId }, { $set: updateFields });
  }
}

module.exports = new TestDAO();
