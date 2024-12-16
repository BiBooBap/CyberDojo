const express = require("express");
const cors = require("cors"); // Import the course package
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const userProgressRoutes = require("./routes/userProgressRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testRoutes = require("./routes/testRoutes");
const shopRoutes = require("./routes/shopRoutes");

const app = express();
const port = 3001;

// Middleware for parsing JSON requests
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // If necessary
  })
);

// Routes for various subsystems
app.use("/auth", authRoutes);
app.use("/registration", registrationRoutes);
app.use("/progress", userProgressRoutes);
app.use("/assistance", assistanceRoutes);
app.use("/courses", courseRoutes);
app.use("/tests", testRoutes);
app.use("/shop", shopRoutes);
app.use("/user", require("./routes/userRoutes"));

// Server startup
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
