const UserDao = require("./dao/userDao");

class ExternalAuthService {
  // Check if the username already exists
  static async checkUsernameExists(username) {
    const user = await UserDao.findUserByUsername(username);
    return !!user;
  }

  // Check if the email already exists
  static async checkEmailExists(email) {
    const user = await UserDao.findUserByEmail(email);
    return !!user;
  }
}

module.exports = ExternalAuthService;
