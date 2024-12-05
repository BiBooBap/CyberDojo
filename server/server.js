const express = require("express");
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registration");
const userProgressRoutes = require("./routes/userProgressRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testRoutes = require("./routes/testRoutes");
const delRoutes = require("./routes/delRoute");

const app = express();
const port = 3000;

// Middleware per il parsing delle richieste in JSON
app.use(express.json());

// Route for the "Autenticazione" subsystem
app.use("/auth", authRoutes);

// Route for the "Registrazione" subsystem
app.use("/registration", registrationRoutes);

// Rotte per i progressi degli utenti
app.use("/progress", userProgressRoutes);

// Rotte per l'assistenza
app.use("/assistance", assistanceRoutes);

// Rotte per i corsi
app.use("/courses", courseRoutes);

// Rotte per i test
app.use("/tests", testRoutes);

// Rotte per la cancellazione dell'utente
app.use("/del", delRoutes);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
