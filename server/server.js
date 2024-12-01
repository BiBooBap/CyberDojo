const express = require("express");
const authRoutes = require("./auth");
const userProgressController = require("./userProgressController");

const app = express();
const port = 3000;

// Middleware per il parsing delle richieste in JSON
app.use(express.json());

// Route per l'autenticazione
app.use("/auth", authRoutes);

// Route per la gestione dei progressi degli utenti
app.use("/progress", userProgressController);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
