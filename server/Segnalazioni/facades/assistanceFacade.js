const AssistanceRequestManager = require("../services/assistanceRequestManager");

class AssistanceFacade {
  // Function to send a request for assistance
  async sendRequest(userUsername, description, message) {
    return await AssistanceRequestManager.createTicket(
      userUsername,
      description,
      message
    );
  }

  // Function to get a request by its id
  async getRequest(ticketId) {
    return await AssistanceRequestManager.getTicket(ticketId);
  }

  // Function to get all the requests of a user
  async getUserRequests(userUsername) {
    return await AssistanceRequestManager.listUserTickets(userUsername);
  }

  // Function to get all the requests
  async getAllRequests() {
    return await AssistanceRequestManager.listAllTickets();
  }

  // Function to close a request
  async closeTicket(id) {
    return await AssistanceRequestManager.closeTicket(id);
  }

  // Function to add a message to a request
  async addMessage(id, username, message, role) {
    return await AssistanceRequestManager.addMessage(id, username, message, role);
  }
}

module.exports = new AssistanceFacade();
