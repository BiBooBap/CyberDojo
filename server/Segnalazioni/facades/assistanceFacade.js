const AssistanceRequestManager = require("../services/assistanceRequestManager");

class AssistanceFacade {
  async sendRequest(userUsername, description) {
    return await AssistanceRequestManager.createTicket(
      userUsername,
      description
    );
  }

  async getRequest(ticketId) {
    return await AssistanceRequestManager.getTicket(ticketId);
  }

  async getUserRequests(userUsername) {
    return await AssistanceRequestManager.listUserTickets(userUsername);
  }

  async getAllRequests() {
    return await AssistanceRequestManager.listAllTickets();
  }

  async closeTicket(id) {
    return await AssistanceRequestManager.closeTicket(id);
  }

  async addMessage(id, username, message, role) {
    return await AssistanceRequestManager.addMessage(id, username, message, role);
  }
}

module.exports = new AssistanceFacade();
