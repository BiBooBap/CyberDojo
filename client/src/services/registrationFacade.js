import registrationService from "./registrationService";

class RegistrationFacade {
  static async registerUser({ username, email, password }) {
    return await registrationService.register({ username, email, password });
  }

}

export default RegistrationFacade;