const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;
let dbInstance = null;

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

module.exports = { connect };