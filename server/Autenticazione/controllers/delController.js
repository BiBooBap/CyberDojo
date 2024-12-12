const express = require("express");
const DeleteUserService = require("../services/delService");
const authenticate = require("../../Middleware/authenticate");

const router = express.Router();

// Route to delete the user's profile
router.post("/", authenticate, async (req, res) => {

  try {
    await DeleteUserService.deleteUser(req.user.username);

    res.status(200).json({ message: "Profilo cancellato con successo" });
  } catch (error) {
    console.error("Errore durante la cancellazione del profilo:", error);
    if (error.message === "Utente non trovato") {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;