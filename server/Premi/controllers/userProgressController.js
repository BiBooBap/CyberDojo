const UserProgressFacade = require("../facades/userProgressFacade");

class UserProgressController {
  static async getProgress(req, res) {
    const username = req.user.username;
    try {
      const progress = await UserProgressFacade.getProgress(username);
      if (!progress.length) {
        return res.status(404).json({ message: "Nessun progresso trovato" });
      }
      res.json(progress);
    } catch (error) {
      console.error("Errore nel recupero dei progressi:", error); // Log dell'errore
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async addProgress(req, res) {
    const { corso_id, descrizione, punti } = req.body;
    const utente_username = req.user.username;
    try {
      const progressData = {
        utente_username,
        corso_id: parseInt(corso_id, 10),
        descrizione,
        punti: parseInt(punti, 10),
        data: new Date(),
      };
      const result = await UserProgressFacade.addProgress(progressData);
      res.status(201).json({ message: "Progresso aggiunto", result });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async updateProgress(req, res) {
    const { id, updateFields } = req.body;
    try {
      const result = await UserProgressFacade.updateProgress(id, updateFields);
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Progresso non trovato" });
      }
      res.json({ message: "Progresso aggiornato", result });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }

  static async deleteProgress(req, res) {
    const { id } = req.body;
    try {
      const result = await UserProgressFacade.removeProgress(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Progresso non trovato" });
      }
      res.json({ message: "Progresso eliminato" });
    } catch (error) {
      res.status(500).json({ message: "Errore interno del server", error });
    }
  }
}

module.exports = UserProgressController;
