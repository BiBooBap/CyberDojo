const AssistanceRequestManager = require("../assistanceRequestManager");

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
}

module.exports = new AssistanceFacade();
