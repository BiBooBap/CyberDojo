import registrationService from "./registrationService";

class RegistrationFacade {
  // Register a new user
  static async registerUser({ username, email, password }) {
    return await registrationService.register({ username, email, password });
  }

}

export default RegistrationFacade;