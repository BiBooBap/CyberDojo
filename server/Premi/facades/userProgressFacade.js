const UserProgressDAO = require("../dao/userProgressDAO");
const notifier = require("../services/progressNotifier");
const UserProgressManager = require("../services/userProgressManager");

class UserProgressFacade {

  // Get all the points of a user
  static async getPoints (username) {
    return await UserProgressManager.getUserPoints(username);
  }

  // Get all the progress of a user
  static async getProgress(username) {
    const progress = await UserProgressDAO.getProgressByUsername(username);
    for (let reward of progress) {
      reward.course_name = await UserProgressDAO.getCourseNameById(
        reward.course_id
      );
    }
    return progress;
  }

  // Add the progress of a user for a specific course
  static async addProgress(progressData) {
    const result = await UserProgressDAO.createProgress(progressData);
    notifier.notifyObservers("progress_added", progressData);
    return result;
  }

  // Update the progress of a user for a specific course
  static async updateProgress(id, updateFields) {
    const result = await UserProgressDAO.updateProgress(id, updateFields);
    notifier.notifyObservers("progress_updated", { id, updateFields });
    return result;
  }

  // Remove the progress of a user for a specific course
  static async removeProgress(id) {
    const result = await UserProgressDAO.deleteProgress(id);
    notifier.notifyObservers("progress_removed", { id });
    return result;
  }
}

module.exports = UserProgressFacade;
