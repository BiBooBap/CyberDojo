const { connect } = require("../../../database/db");

class AssistanceRequestDAO {
  static async createTicket(userUsername, description, message) {
    const db = await connect();
    
    // Utilizza un meccanismo di incremento atomico per evitare duplicazioni
    const lastTicket = await db.collection("tickets")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .project({ _id: 1 })
    .toArray();

    var lastId = lastTicket.length > 0 ? lastTicket[0]._id : 0;
    const newId = lastId + 1;
    console.log(message);
    console.log(newId);
    
    
    const ticket = {
      _id: newId,
      user_username: userUsername,
      description: description,
      creation_date: new Date(),
      messages: [],
      is_open: "Aperto",
    };
    
    await db.collection("tickets").insertOne(ticket);

    // Aggiungi il messaggio iniziale
    this.addMessage(newId, userUsername, message, "user");
    return ticket._id;
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
