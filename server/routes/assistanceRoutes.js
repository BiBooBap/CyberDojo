const express = require("express");
const AssistanceController = require("../Segnalazioni/controllers/assistanceController");

const router = express.Router();

// Crea una nuova richiesta di assistenza
router.post("/create", AssistanceController.createRequest);

// Ottieni una richiesta di assistenza specifica
router.get("/:id", AssistanceController.getRequest);

// Elenco delle richieste di un utente
router.get("/", AssistanceController.listUserRequests);

module.exports = router;
