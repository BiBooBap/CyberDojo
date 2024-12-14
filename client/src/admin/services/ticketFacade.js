import ticketService from "./ticketService";

class ticketFacade {
  static async getSupportTickets(token) {
    return await ticketService.getSupportTickets(token);
  }

  static async getTicketDetails(id, token) {
    return await ticketService.getTicketDetails(id, token);
  }

  static async closeTicket(id, token) {
    return await ticketService.closeTicket(id, token);
  }

  static async addMessage(id, username, message, role, token) {
    return await ticketService.addMessage(id, username, message, role, token);
  }
}

export default ticketFacade;
