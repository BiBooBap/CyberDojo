const express = require("express");
const AuthService = require("../services/authService");

const router = express.Router();

// Login with username
router.post("/username", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sono obbligatori" });
  }

  try {
    const token = await AuthService.loginByUsername(username, password);
    res.json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(401).json({ message: error.message });
  }
});

// Login with email
router.post("/email", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email e password sono obbligatori" });
  }

  try {
    const token = await AuthService.loginByEmail(email, password);
    res.json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;