const DelDao = require("../dao/delDAO");

class DeleteUserService {
  // Method to delete a user
  static async deleteUser(username) {
    try {
      await DelDao.deleteUser(username);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteUserService;