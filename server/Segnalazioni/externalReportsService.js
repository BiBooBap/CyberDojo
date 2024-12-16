const AssistanceRequestDAO = require('./dao/assistanceRequestDAO');

class ExternalReportsService {
    // Method to change the username of the tickets
    static async changeTicketsUsername(currentUsername, newUsername) {
        return await AssistanceRequestDAO.changeTicketsUsername(currentUsername, newUsername);
    }
}

module.exports = ExternalReportsService;