require("dotenv").config();

const express = require("express");

const { MongoClient } = require("mongodb");

const jwt = require("jsonwebtoken");



const app = express();

const port = 3000;

const secretKey = process.env.JWT_SECRET_KEY;

const mongoUri = process.env.MONGO_URI;



let dbInstance = null;



if (!secretKey || !mongoUri) {

  console.error("Errore: JWT_SECRET_KEY o MONGO_URI non definite nel file .env");

  process.exit(1);

}



// Function to connect to the database

async function connect() {

  if (dbInstance) return dbInstance;



  try {

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    dbInstance = client.db("CyberDojo");

    console.log("Connessione al database avvenuta con successo");

    return dbInstance;

  } catch (error) {

    console.error("Errore durante la connessione al database:", error);

    throw error;

  }

}



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

    res.status(401).json({ message: "Autenticazione fallita" });

  }

};



// Middleware to parse request bodies as JSON

app.use(express.json());



// Route to delete the user's profile

app.delete("/delete-profile", authenticate, async (req, res) => {

  try {

    const db = await connect();

    const result = await db.collection("user").deleteOne({ username: req.user.username });



    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json({ message: "Profile cancellato con successo" });
  } catch (error) {
    console.error("Errore durante la cancellazione del profilo:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});