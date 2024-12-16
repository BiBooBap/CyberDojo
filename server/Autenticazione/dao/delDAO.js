const { connect } = require("../../../database/db");
const ExternalRewardsService = require("../../Premi/externalRewardsService");
const ExternalShopService = require("../../Shop/externalShopService");

class DelDao {
  static async deleteUser(username) {
    const db = await connect();

    try {
      // Deletion of the user
      const userDeletion = await db
        .collection("user")
        .deleteOne({ username });

      if (userDeletion.deletedCount === 0) {
        throw new Error("Utente non trovato");
      }

      // Deletion of the rewards
      await ExternalRewardsService.deleteProgress(username);

      // Deletion of the tickets
      await db.collection("tickets").deleteMany({ user_username: username });

      // Deletion of the inventory
      await ExternalShopService.deleteInventory(username);

      return { success: true };
    } catch (error) {
      console.error("Errore durante la cancellazione dell'utente:", error);
      throw error;
    }
  }
}

module.exports = DelDao;