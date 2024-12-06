const { connect } = require("../../database/db");

class RegistrationDao {
  static async createUser(user) {
    const db = await connect();
    return db.collection("user").insertOne(user);
  }
}

module.exports = RegistrationDao;