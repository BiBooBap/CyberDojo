const { connect } = require("../../../database/db");

class RegistrationDao {
  // Method for creating a new user
  static async createUser(user) {
    const db = await connect();
    return db.collection("user").insertOne(user);
  }
}

module.exports = RegistrationDao;
