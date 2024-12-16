const UserProgressDAO = require("./dao/userProgressDAO");

class ExternalRewardsService {
  // Deletes a user's progress
  static async deleteProgress(user_id) {
    return await UserProgressDAO.deleteProgress(user_id);
  }

  // Checks if the user has taken a test for that course
  static async getTestExistsForUserAndCourse(username, course_id) {
    const testExists = await UserProgressDAO.getTestExistsForUserAndCourse(
      username,
      course_id
    );

    return testExists == null ? false : true;
  }

  // Change the username in the rewards database
  static async changeRewardsUsername(currentUsername, newUsername) {
    return await UserProgressDAO.changeRewardsUsername(currentUsername, newUsername);
  }
}

module.exports = ExternalRewardsService;
