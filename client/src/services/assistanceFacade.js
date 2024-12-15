import assistanceService from "./assistanceService";

class AssistanceFacade {
  // Funzione per inviare una nuova richiesta di supporto
  static async sendSupportRequest(username, description, token, message) {
    return await assistanceService.sendSupportRequest(
      username,
      description,
      token,
      message
    );
  }

  // Funzione per recuperare i ticket dell'utente
  static async getUserTickets(token, username) {
    return await assistanceService.getUserTickets(token, username);
  }
}

export default AssistanceFacade;
