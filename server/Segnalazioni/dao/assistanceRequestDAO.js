const { connect } = require("../../../database/db");

class AssistanceRequestDAO {
  // Create new ticket
  static async createTicket(userUsername, description, message) {
    const db = await connect();

    // It uses an atomic increment mechanism to avoid duplication
    const lastTicket = await db.collection("tickets")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .project({ _id: 1 })
    .toArray();

    var lastId = lastTicket.length > 0 ? lastTicket[0]._id : 0;
    const newId = lastId + 1;

    const ticket = {
      _id: newId,
      user_username: userUsername,
      description: description,
      creation_date: new Date(),
      messages: [],
      is_open: "Aperto",
    };

    await db.collection("tickets").insertOne(ticket);

    // Add initial message
    this.addMessage(newId, userUsername, message, "user");
    return ticket._id;
  }

  // Get ticket by id
  static async getTicketById(id) {
    const db = await connect();
    return db.collection("tickets").findOne({ _id: parseInt(id) });
  }

  // Get all tickets of a user
  static async getUserTickets(userUsername) {
    const db = await connect();
    return db
      .collection("tickets")
      .find({ user_username: userUsername })
      .toArray();
  }

  // Get all tickets
  static async getAllTickets() {
    const db = await connect();
    return db.collection("tickets").find({}).toArray();
  }

  // Close ticket
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

  // Add message to ticket
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

  static async changeTicketsUsername(currentUsername, newUsername) { 
    const db = await connect();

    return await db.collection("tickets").updateMany(
      { user_username: currentUsername },
      { $set: { user_username: newUsername } }
    )
  }
}

module.exports = AssistanceRequestDAO;
