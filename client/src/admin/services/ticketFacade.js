import ticketService from "./ticketService";

const ticketFacade = {
  getSupportTickets: async (token) => {
    return await ticketService.getSupportTickets(token);
  },
};

export default ticketFacade;
