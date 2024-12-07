const express = require("express");
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const userProgressRoutes = require("./routes/userProgressRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testRoutes = require("./routes/testRoutes");
const streakRoutes = require("./routes/streakRoutes");

const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Route for the "Autenticazione" subsystem
app.use("/auth", authRoutes);

// Route for the "Registrazione" subsystem
app.use("/registration", registrationRoutes);

// Routes for user progress
app.use("/progress", userProgressRoutes);

// Routes for assistance
app.use("/assistance", assistanceRoutes);

// Routes for courses
app.use("/courses", courseRoutes);

// Routes for tests
app.use("/tests", testRoutes);

// Routes for user login streaks
app.use("/streaks", streakRoutes);

// Server startup
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
