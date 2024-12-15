const AssistanceFacade = require("../facades/assistanceFacade");

class AssistanceController {
  static async createRequest(req, res) {
    try {
      const { userUsername, description } = req.body;
      console.log(userUsername);
      console.log(description);
      const ticketId = await AssistanceFacade.sendRequest(
        userUsername,
        description
      );
      res
        .status(201)
        .json({ message: "Richiesta inviata con successo", ticketId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getRequest(req, res) {
    try {
      const id = req.query.id;
      const ticket = await AssistanceFacade.getRequest(id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket non trovato" });
      }
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async listUserRequests(req, res) {
    try {
      const { userUsername } = req.query;
      const tickets = await AssistanceFacade.getUserRequests(userUsername);
      res.json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllRequests(req, res) {
    try {
      const tickets = await AssistanceFacade.getAllRequests();
      res.json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async closeTicket(req, res) {
    try {
      const id = req.query.id;
      const result = await AssistanceFacade.closeTicket(id);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Ticket non trovato" });
      }
      res.json({ message: "Ticket chiuso con successo" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addMessage(req, res) {
    try {
      const id = req.query.id;
      const username = req.query.username;
      const message = req.query.message;
      const role = req.query.role;
      const result = await AssistanceFacade.addMessage(
        id,
        username,
        message,
        role
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Ticket non trovato" });
      }
      res.json({ message: "Messaggio aggiunto con successo" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AssistanceController;
