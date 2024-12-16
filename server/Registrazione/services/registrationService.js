const bcrypt = require("bcrypt");
const RegistrationDao = require("../dao/registrationDao");
const ExternalAuthService = require("../../Autenticazione/externalAuthService");

class RegistrationService {
  // Method for registering a new user
  static async registerUser(email, username, password) {
    const emailExists = await ExternalAuthService.checkEmailExists(email);
    const usernameExists = await ExternalAuthService.checkUsernameExists(username);

    if (usernameExists) {
      throw new Error("Nome utente non disponibile");
    }

    if (emailExists) {
      throw new Error("Email già registrata");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password: hashedPassword,
      role: "user",
      points: 0,
      avatar: "CyberDojo/database/img/base.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [],
    };

    await RegistrationDao.createUser(newUser);
  }
}

module.exports = RegistrationService;
