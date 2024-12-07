const express = require("express");
const cors = require("cors"); // Importa il pacchetto cors
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const userProgressRoutes = require("./routes/userProgressRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testRoutes = require("./routes/testRoutes");
const streakRoutes = require("./routes/streakRoutes");

const app = express();
const port = 3001;

// Middleware per il parsing delle richieste JSON
app.use(express.json());

// Configura CORS
app.use(cors({
  origin: "http://localhost:3000", // Specifica l'origine consentita
  methods: ["GET", "POST", "PUT", "DELETE"], // Metodi HTTP consentiti
  credentials: true, // Se necessario
}));

// Rotte per i vari sottosistemi
app.use("/auth", authRoutes);
app.use("/registration", registrationRoutes);
app.use("/progress", userProgressRoutes);
app.use("/assistance", assistanceRoutes);
app.use("/courses", courseRoutes);
app.use("/tests", testRoutes);
app.use("/streaks", streakRoutes);

// Rotta catch-all (se presente)
// Assicurati che le rotte API siano definite prima di questa rotta
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});