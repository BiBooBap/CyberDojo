const AssistanceRequestDAO = require("../dao/assistanceRequestDAO");

class AssistanceRequestManager {
  constructor() {
    if (AssistanceRequestManager.instance) {
      return AssistanceRequestManager.instance;
    }
    AssistanceRequestManager.instance = this;
  }

  // Create a new support ticket
  async createTicket(userUsername, description, message) {
    if (!userUsername || !description || !message) {
      throw new Error("Username e descrizione sono obbligatori.");
    }
    return await AssistanceRequestDAO.createTicket(userUsername, description, message);
  }

  // Get a support ticket by its ID
  async getTicket(ticketId) {
    return await AssistanceRequestDAO.getTicketById(ticketId);
  }

  // Get all the support tickets of a user
  async listUserTickets(userUsername) {
    return await AssistanceRequestDAO.getUserTickets(userUsername);
  }

  // Get all the support tickets
  async listAllTickets() {
    return await AssistanceRequestDAO.getAllTickets();
  }

  // Close a support ticket
  async closeTicket(ticketId) {
    return await AssistanceRequestDAO.closeTicket(ticketId);
  }

  // Add a message to a support ticket
  async addMessage(ticketId, username, message, role) {
    return await AssistanceRequestDAO.addMessage(ticketId, username, message, role);
  }
}

module.exports = new AssistanceRequestManager();
