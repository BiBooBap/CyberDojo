const UserProgressDAO = require("../dao/userProgressDAO");
const notifier = require("../services/progressNotifier");

class UserProgressFacade {
  static async getProgress(username) {
    return await UserProgressDAO.getProgressByUsername(username);
  }

  static async addProgress(progressData) {
    const result = await UserProgressDAO.createProgress(progressData);
    notifier.notifyObservers("progress_added", progressData);
    return result;
  }

  static async updateProgress(id, updateFields) {
    const result = await UserProgressDAO.updateProgress(id, updateFields);
    notifier.notifyObservers("progress_updated", { id, updateFields });
    return result;
  }

  static async removeProgress(id) {
    const result = await UserProgressDAO.deleteProgress(id);
    notifier.notifyObservers("progress_removed", { id });
    return result;
  }
}

module.exports = UserProgressFacade;
