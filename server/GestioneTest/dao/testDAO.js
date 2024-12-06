const { connect } = require("./db");

class TestDAO {
  // Crea un nuovo test statico per un corso
  async createTest(test) {
    const db = await connect();
    const result = await db.collection("tests").insertOne(test);
    return result.insertedId;
  }

  // Recupera tutti i test associati a un corso
  async getTestsByCourse(courseId) {
    const db = await connect();
    return await db.collection("tests").find({ course_id: courseId }).toArray();
  }

  // Aggiunge un risultato (ricompensa) alla collezione rewards
  async addReward(reward) {
    const db = await connect();
    const result = await db.collection("rewards").insertOne(reward);
    return result.insertedId;
  }

  // Andrebbe implementata una funzione che recupera anche tutti i corsi svolti da un utente in modo da poterla utilizzare nell'Area Personale (da modificare il db)
}

module.exports = new TestDAO();
