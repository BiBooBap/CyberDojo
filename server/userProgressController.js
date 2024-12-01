const express = require("express");
const { connect } = require("./db"); // Connessione al database
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET /progress/:username: Recupera i progressi di un utente specifico.
// POST /progress: Aggiunge un nuovo progresso per un utente.
// DELETE /progress/:id: Elimina un progresso specifico.
// PATCH /progress/:id: Modifica un progresso specifico.

// Recupera i progressi di un utente
router.get("/progress/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const db = await connect();
    const progress = await db.collection("premi").find({ utente_username: username }).toArray();

    if (!progress.length) {
      return res.status(404).json({ message: "Nessun progresso trovato per l'utente specificato" });
    }

    res.json(progress);
  } catch (error) {
    console.error("Errore durante il recupero dei progressi:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Aggiungi un nuovo progresso per un utente
router.post("/progress", async (req, res) => {
  const { utente_username, corso_id, descrizione, punti } = req.body;

  if (!utente_username || !corso_id || !descrizione || !punti) {
    return res.status(400).json({ message: "Tutti i campi richiesti devono essere forniti" });
  }

  try {
    const db = await connect();
    const newProgress = {
      utente_username,
      corso_id: parseInt(corso_id, 10),
      descrizione,
      punti: parseInt(punti, 10),
      data: new Date(),
    };

    await db.collection("premi").insertOne(newProgress);

    res.status(201).json({ message: "Progresso aggiunto con successo", newProgress });
  } catch (error) {
    console.error("Errore durante l'aggiunta del progresso:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Elimina un progresso specifico
router.delete("/progress/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connect();
    const result = await db.collection("premi").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Progresso non trovato" });
    }

    res.json({ message: "Progresso eliminato con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del progresso:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Modifica un progresso specifico
router.patch("/progress/:id", async (req, res) => {
  const { id } = req.params;
  const { descrizione, punti } = req.body;

  try {
    const db = await connect();
    const updateFields = {};

    if (descrizione) updateFields.descrizione = descrizione;
    if (punti) updateFields.punti = parseInt(punti, 10);

    const result = await db.collection("premi").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Progresso non trovato" });
    }

    res.json({ message: "Progresso aggiornato con successo" });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del progresso:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;
