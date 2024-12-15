const { connect } = require("../../../database/db");

class AssistanceRequestDAO {
  static async createTicket(userUsername, description) {
    const db = await connect();
    console.log(userUsername);
    console.log(description);
    const result = await db.collection("tickets").insertOne({
      user_username: userUsername,
      description: description,
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

  static async closeTicket(id) {
    const db = await connect();
    return db.collection("tickets").updateOne(
      { _id: parseInt(id) },
      {
        $set: {
          is_open: "Risolto",
        },
      }
    );
  }

  static async addMessage(id, username, message, role) {
    const db = await connect();
    return db.collection("tickets").updateOne(
      { _id: parseInt(id) },
      {
        $push: {
          messages: {
            username: username,
            message: message,
            role: role,
            timestamp: new Date(),
          },
        },
      }
    );
  }
}

module.exports = AssistanceRequestDAO;
