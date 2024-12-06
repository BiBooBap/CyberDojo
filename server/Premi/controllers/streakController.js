const StreakService = require("../Premi/services/streakService");

class StreakController {
  static async getStreak(req, res) {
    const { username } = req.params;
    try {
      const streak = await StreakService.getStreak(username);
      if (!streak) {
        return res.status(404).json({ message: "Streak non trovato" });
      }
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async updateStreak(req, res) {
    const { username } = req.user; // Assuming the user is authenticated
    try {
      const streak = await StreakService.updateStreak(username);
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = StreakController;