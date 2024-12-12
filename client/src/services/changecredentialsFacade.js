import ChangeCredentialsService from "./changecredentialsService";

class ChangeCredentialsFacade {
  static async updateUserCredentials({ newUsername, newEmail, newPassword }) {
    return await ChangeCredentialsService.sendNewCredentials({ newUsername, newEmail, newPassword });
  }

  static async getUserInfo() {
    return await ChangeCredentialsService.getUserInfo();
  }

  static async verifyPassword(currentPassword) {
    return await ChangeCredentialsService.verifyPassword(currentPassword);
  }

  static async deleteAccount() {
    return await ChangeCredentialsService.deleteAccount();
  }
}

export default ChangeCredentialsFacade;