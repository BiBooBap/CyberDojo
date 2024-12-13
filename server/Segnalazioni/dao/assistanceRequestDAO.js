const { connect } = require("../../../database/db");

class AssistanceRequestDAO {
  static async createTicket(userUsername, description) {
    const db = await connect();
    const result = await db.collection("tickets").insertOne({
      user_username: userUsername,
      description,
      creation_date: new Date(),
    });
    return result.insertedId;
  }

  static async getTicketById(id) {
    const db = await connect();
    return db.collection("tickets").findOne({ _id: parseInt(id) });
  }

  static async getUserTickets(userUsername) {
    const db = await connect();
    return db
      .collection("tickets")
      .find({ user_username: userUsername })
      .toArray();
  }

  static async getAllTickets() {
    const db = await connect();
    return db.collection("tickets").find({}).toArray();
  }
}

module.exports = AssistanceRequestDAO;
