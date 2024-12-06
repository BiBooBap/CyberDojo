const { connect } = require("../../database/db");

class StreakDAO {
  static async getStreakByUsername(username) {
    const db = await connect();
    return db.collection("streaks").findOne({ user_username: username });
  }

  static async updateStreak(username, streakData) {
    const db = await connect();
    return db.collection("streaks").updateOne(
      { user_username: username },
      { $set: streakData },
      { upsert: true }
    );
  }
}

module.exports = StreakDAO;