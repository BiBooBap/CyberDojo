const AssistanceRequestDAO = require("../dao/assistanceRequestDAO");

class AssistanceRequestManager {
  constructor() {
    if (AssistanceRequestManager.instance) {
      return AssistanceRequestManager.instance;
    }
    AssistanceRequestManager.instance = this;
  }

  async createTicket(userUsername, description) {
    if (!userUsername || !description) {
      throw new Error("Username e descrizione sono obbligatori.");
    }
    return await AssistanceRequestDAO.createTicket(userUsername, description);
  }

  async getTicket(ticketId) {
    return await AssistanceRequestDAO.getTicketById(ticketId);
  }

  async listUserTickets(userUsername) {
    return await AssistanceRequestDAO.getUserTickets(userUsername);
  }
}

module.exports = new AssistanceRequestManager();
