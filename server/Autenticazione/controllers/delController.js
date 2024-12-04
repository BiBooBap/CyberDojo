const express = require("express");
const jwt = require("jsonwebtoken");
const { deleteUser } = require("../services/delService");

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to authenticate the user
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mancante o non valido" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token non valido" });
  }
};

// Route to delete the user's profile
router.delete("/delete-profile", authenticate, async (req, res) => {
  try {
    const result = await deleteUser(req.user.username);
    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.status(200).json({ message: "Profilo cancellato con successo" });
  } catch (error) {
    console.error("Errore durante la cancellazione del profilo:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;