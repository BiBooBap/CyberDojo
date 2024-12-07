const StreakDAO = require("../dao/streakDAO");

class StreakService {
  static async getStreak(username) {
    return await StreakDAO.getStreakByUsername(username);
  }

  static async updateStreak(username) {
    const streak = await StreakDAO.getStreakByUsername(username);
    const today = new Date().toISOString().split("T")[0];

    if (streak && streak.lastLoginDate === today) {
      return streak; // No update needed
    }

    const newStreak = streak ? streak.streak + 1 : 1;
    const streakData = {
      user_username: username,
      streak: newStreak,
      lastLoginDate: today,
    };

    await StreakDAO.updateStreak(username, streakData);
    return streakData;
  }
}

module.exports = StreakService;
