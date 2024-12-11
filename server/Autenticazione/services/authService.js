const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDao = require("../dao/userDao");

const secretKey = "sigmasigmaonthewall";

class AuthService {

  static generateToken(user) {
    return jwt.sign(
      { username: user.username, role: user.role },
      secretKey,
      { expiresIn: "30m" }
    );
  }

  static async loginByUsername(username, password) {

    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non valide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenziali non valide");
    }

    const token = AuthService.generateToken(user);

    return token;
  }

  static async loginByEmail(email, password) {
    const user = await UserDao.findUserByEmail(email);
    if (!user) {
      throw new Error("Credenziali non valide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenziali non valide");
    }

    const token = AuthService.generateToken(user);

    return token;
  }

  static async verifyCurrentPassword(username, currentPassword) {
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non trovato");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Password attuale non valida");
    }

    return true;
  }

  static async getUserInfo(username) {
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non trovato");
    }
    return {
      username: user.username,
      email: user.email,
    };
  }

  static async updateUserInfo( username, newEmail, newUsername, newPassword) {

    if (!newEmail || !newUsername) {
      throw new Error("Email e username sono obbligatori");
    }

    const existingUserByEmail = await UserDao.findUserByEmail(newEmail);
    if (existingUserByEmail && existingUserByEmail.username !== username) {
      throw new Error("Email già utilizzata da un altro utente");
    }

    const existingUserByUsername = await UserDao.findUserByUsername(newUsername);
    if (existingUserByUsername && existingUserByUsername.username !== username) {
      throw new Error("Nome utente già utilizzato da un altro utente");
    }

    const currentUser = await UserDao.findUserByUsername(username);
    if (!currentUser) {
      throw new Error("Utente non trovato");
    }

    const updateFields = {};
    let isUsernameChanged = false;

    if (newEmail !== currentUser.email) {
      updateFields.email = newEmail;
    }

    if (newUsername !== currentUser.username) {
      updateFields.username = newUsername;
      isUsernameChanged = true;
    }

    if (newPassword) {
      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    // Check if there are fields to update
    if (Object.keys(updateFields).length > 0) {
      await UserDao.updateUser(username, updateFields);

      const updatedUser = await UserDao.findUserByUsername(newUsername);

      return {
        message: "Informazioni aggiornate con successo",
        newUsername: isUsernameChanged ? newUsername : null,
        token: isUsernameChanged ? AuthService.generateToken(updatedUser) : null,
      };

    } else {
      console.log("Nessun campo da aggiornare.");
      return { message: "Informazioni aggiornate con successo", newUsername: null, token: null };
    }
  }
}

module.exports = AuthService;
