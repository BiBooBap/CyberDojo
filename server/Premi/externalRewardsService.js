const UserProgressDAO = require("./dao/userProgressDAO");
const StreakDAO = require("./dao/streakDAO");

class ExternalRewardsService {
  // Deletes a user's progress
  static async deleteProgress(user_id) {
    return await UserProgressDAO.deleteProgress(user_id);
  }

  // Deletes a user's streak
  static async deleteStreak(user_id) {
    return await StreakDAO.deleteStreak(user_id);
  }

  // Checks if the user has taken a test for that course
  static async getTestExistsForUserAndCourse(username, course_id) {
    const testExists = await UserProgressDAO.getTestExistsForUserAndCourse(
      username,
      course_id
    );

    return testExists == null ? false : true;
  }
}

module.exports = ExternalRewardsService;
