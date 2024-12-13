import ticketService from "./ticketService";

class ticketFacade {
  static async getSupportTickets(token) {
    return await ticketService.getSupportTickets(token);
  }

  static async getTicketDetails(id, token) {
    return await ticketService.getTicketDetails(id, token);
  }
}

export default ticketFacade;
