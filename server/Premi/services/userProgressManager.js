const UserProgressDAO = require("../dao/userProgressDAO");

class UserProgressManager {
  // Returns the points of the user with the specified username
  static async getUserPoints(username) {
    const user = await UserProgressDAO.findUserByUsername(username);
    if (!user) throw new Error("Utente non trovato");
    return user.points;
  }
}

module.exports = UserProgressManager;