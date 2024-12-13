const AssistanceFacade = require("../facades/assistanceFacade");

class AssistanceController {
  static async createRequest(req, res) {
    try {
      const { userUsername, description } = req.body;
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
}

module.exports = AssistanceController;
