const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDao = require("../dao/userDao");

const secretKey = "your_secret_key"; // Change to a secure secret key

class AuthService {
  static async loginByUsername(username, password) {
    console.log("Username = " + username);
    console.log("Password = " + password);
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non valide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenziali non valide");
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      secretKey,
      { expiresIn: "8h" }
    );

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

    const token = jwt.sign(
      { username: user.username, role: user.role },
      secretKey,
      { expiresIn: "8h" }
    );

    return token;
  }

  static async verifyCurrentPassword(username, currentPassword) {
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non trovato");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
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

  static async updateUserInfo(username, newEmail, newUsername, newPassword) {
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

    const updateFields = {};
    if (newEmail !== existingUserByEmail.email) updateFields.email = newEmail;
    if (newUsername !== existingUserByUsername.username) updateFields.username = newUsername;
    if (newPassword) updateFields.password = await bcrypt.hash(newPassword, 10);

    await UserDao.updateUser(username, updateFields);
  }

}

module.exports = AuthService;