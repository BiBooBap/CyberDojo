const express = require("express");
const RegistrationService = require("../services/registrationService");

const router = express.Router();

// Registration
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  try {
    await RegistrationService.registerUser(email, username, password);
    res.status(201).json({ message: "Registrazione avvenuta con successo" });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(409).json({ message: error.message });
  }
});

module.exports = router;