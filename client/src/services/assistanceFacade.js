import assistanceService from "./assistanceService";

class AssistanceFacade {
  // Function to send a new support request
  static async sendSupportRequest(username, description, token, message) {
    return await assistanceService.sendSupportRequest(
      username,
      description,
      token,
      message
    );
  }

  // Function to retrieve the user's tickets
  static async getUserTickets(token, username) {
    return await assistanceService.getUserTickets(token, username);
  }
}

export default AssistanceFacade;
