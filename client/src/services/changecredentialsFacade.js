import ChangeCredentialsService from "./changecredentialsService";

class ChangeCredentialsFacade {
  static async updateUserCredentials({ newUsername, newEmail, newPassword }) {
    return await ChangeCredentialsService.sendNewCredentials({ newUsername, newEmail, newPassword });
  }

  static async getUserInfo() {
    return await ChangeCredentialsService.getUserInfo();
  }

}

export default ChangeCredentialsFacade;