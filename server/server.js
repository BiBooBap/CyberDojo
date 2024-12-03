const express = require("express");
const authRoutes = require("./auth");
const userProgressRoutes = require("./routes/userProgressRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");

const app = express();
const port = 3000;

// Middleware per il parsing delle richieste in JSON
app.use(express.json());

// Rotte per l'autenticazione
app.use("/auth", authRoutes);

// Rotte per i progressi degli utenti
app.use("/progress", userProgressRoutes);

// Rotte per l'assistenza
app.use("/assistance", assistanceRoutes);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
