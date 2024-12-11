const express = require("express");
const AuthService = require("../services/authService");
const authenticate = require("../../Middleware/authenticate");

const router = express.Router();

// Verify current password
router.post("/verify-password", authenticate, async (req, res) => {
  const { currentPassword } = req.body;
  const username = req.user.username;

  if (!currentPassword) {
    return res
      .status(400)
      .json({ message: "Username e password attuale sono obbligatori" });
  }

  try {
    await AuthService.verifyCurrentPassword(username, currentPassword);
    res.json({ message: "Password verificata con successo" });
  } catch (error) {
    console.error("Errore durante la verifica della password:", error);
    res.status(401).json({ message: error.message });
  }
});

// Get user information
router.get("/user-info", authenticate, async (req, res) => {
  const username = req.user.username;

  try {
    const userInfo = await AuthService.getUserInfo(username);
    res.json(userInfo);
  } catch (error) {
    console.error("Errore durante il recupero delle informazioni dell'utente:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update user information
router.post("/update-user-info", authenticate, async (req, res) => {
  const { newUsername, newEmail, newPassword } = req.body;
  const username = req.user.username;

  if (!newEmail || !newUsername) {
    return res
      .status(400)
      .json({ message: "Email e username sono obbligatori" });
  }

  try {
    const result = await AuthService.updateUserInfo(username, newEmail, newUsername, newPassword);
    
    // Check if the username has been updated to return a new token
    if (result.newUsername && result.token) {
      return res.json({
        message: result.message,
        token: result.token,
      });
    }

    res.json({ message: result.message });

  } catch (error) {
    console.error( "Errore durante l'aggiornamento delle informazioni dell'utente:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
