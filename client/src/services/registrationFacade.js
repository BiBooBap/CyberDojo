import registrationService from "./registrationService";

class RegistrationFacade {
  static async registerUser({ username, email, password }) {
    return await registrationService.register({ username, email, password });
  }

  // Puoi aggiungere altri metodi correlati qui
}

export default RegistrationFacade;