const DelDao = require("../dao/delDAO");

class DeleteUserService {
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