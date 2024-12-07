const UserDao = require("./dao/userDao");

class ExternalAuthService {
  static async checkUsernameExists(username) {
    const user = await UserDao.findUserByUsername(username);
    return !!user;
  }

  static async checkEmailExists(email) {
    const user = await UserDao.findUserByEmail(email);
    return !!user;
  }
}

module.exports = ExternalAuthService;
