const { connect } = require("../../../database/db");
const { ObjectId } = require("mongodb");

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

  static async getTicketById(ticketId) {
    const db = await connect();
    return db.collection("tickets").findOne({ _id: new ObjectId(ticketId) });
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
