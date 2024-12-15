const UserProgressDAO = require("../dao/userProgressDAO");

class UserProgressManager {
  static async getUserPoints(username) {
    const user = await UserProgressDAO.findUserByUsername(username);
    if (!user) throw new Error("Utente non trovato");
    return user.points; // Assicurati che il modello utente abbia un campo `points`
  }
  /*...*/
}

module.exports = UserProgressManager;