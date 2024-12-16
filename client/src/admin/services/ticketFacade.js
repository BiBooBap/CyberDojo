import ticketService from "./ticketService";

// The ticketFacade class provides static methods to interact with support tickets
class ticketFacade {
  // Retrieves all support tickets
  static async getSupportTickets(token) {
    return await ticketService.getSupportTickets(token);
  }

  // Retrieves details of a specific ticket by ID
  static async getTicketDetails(id, token) {
    return await ticketService.getTicketDetails(id, token);
  }

  // Closes a ticket by ID
  static async closeTicket(id, token) {
    return await ticketService.closeTicket(id, token);
  }

  // Adds a message to a ticket
  static async addMessage(id, username, message, role, token) {
    return await ticketService.addMessage(id, username, message, role, token);
  }
}

export default ticketFacade;
