import ChangeCredentialsService from "./changecredentialsService";

class ChangeCredentialsFacade {
  // Sends new credentials to the server
  static async updateUserCredentials({ newUsername, newEmail, newPassword }) {
    return await ChangeCredentialsService.sendNewCredentials({ newUsername, newEmail, newPassword });
  }

  // Retrieves user information
  static async getUserInfo() {
    return await ChangeCredentialsService.getUserInfo();
  }

  // Verifies the current password
  static async verifyPassword(currentPassword) {
    return await ChangeCredentialsService.verifyPassword(currentPassword);
  }

  // Deletes the user account
  static async deleteAccount() {
    return await ChangeCredentialsService.deleteAccount();
  }
}

export default ChangeCredentialsFacade;