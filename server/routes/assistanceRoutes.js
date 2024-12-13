const express = require("express");
const AssistanceController = require("../Segnalazioni/controllers/assistanceController");

const router = express.Router();

// Crea una nuova richiesta di assistenza
router.post("/create", AssistanceController.createRequest);

// Ottieni tutte le richieste di assistenza
router.get("/tickets", AssistanceController.getAllRequests);

// Elenco delle richieste di un utente
router.get("/listuser", AssistanceController.listUserRequests);

// Ottieni una richiesta di assistenza specifica per ID
router.get("/ticket", AssistanceController.getRequest);

module.exports = router;
