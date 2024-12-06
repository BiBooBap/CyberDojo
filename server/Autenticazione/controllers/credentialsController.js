const express = require("express");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/authService");

const router = express.Router();
const secretKey = "your_secret_key"; // Change to a secure secret key

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

// Verify current password
router.post("/verify-password", authenticate, async (req, res) => {
    const { currentPassword } = req.body;
    const username = req.user.username;

    if (!currentPassword) {
        return res.status(400).json({ message: "Username e password attuale sono obbligatori" });
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
router.put("/update-user-info", authenticate, async (req, res) => {
    const { newEmail, newUsername, newPassword } = req.body;
    const username = req.user.username;

    if (!newEmail || !newUsername) {
        return res.status(400).json({ message: "Email e username sono obbligatori" });
    }

    try {
        await AuthService.updateUserInfo(username, newEmail, newUsername, newPassword);
        res.json({ message: "Informazioni aggiornate con successo" });
    } catch (error) {
        console.error("Errore durante l'aggiornamento delle informazioni dell'utente:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;