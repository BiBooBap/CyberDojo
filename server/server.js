const express = require("express");
const authRoutes = require("./auth");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
