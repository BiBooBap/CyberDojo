const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connect } = require("../database/db");

const router = express.Router();
const secretKey = "your_secret_key"; // Cambia con una chiave segreta sicura

// Login tramite username
router.post("/login/username", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sono obbligatori" });
  }

  try {
    const db = await connect();
    const user = await db.collection("utenti").findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const token = jwt.sign(
      { username: user.username, ruolo: user.ruolo },
      secretKey,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Login tramite email
router.post("/login/email", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email e password sono obbligatori" });
  }

  try {
    const db = await connect();
    const user = await db.collection("utenti").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const token = jwt.sign(
      { username: user.username, ruolo: user.ruolo },
      secretKey,
      { expiresIn: "6h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  try {
    const db = await connect();
    const existingUserByUsername = await db
      .collection("utenti")
      .findOne({ username });
    const existingUserByEmail = await db
      .collection("utenti")
      .findOne({ email });

    if (existingUserByUsername) {
      return res.status(409).json({ message: "Nome utente non disponibile" });
    }

    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email già registrata" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password: hashedPassword,
      ruolo: "utente",
      punti: 0,
      avatar: "CyberDojo/database/img/base.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    };

    await db.collection("utenti").insertOne(newUser);

    res.status(201).json({ message: "Registrazione avvenuta con successo" });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;
