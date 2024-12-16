const express = require("express");
const AssistanceController = require("../Segnalazioni/controllers/assistanceController");

const router = express.Router();

// Create a new support request
router.post("/create", AssistanceController.createRequest);

// Get all support requests
router.get("/tickets", AssistanceController.getAllRequests);

// List of a user's requests
router.get("/listuser", AssistanceController.listUserRequests);

// Get an ID-specific support request
router.get("/ticket", AssistanceController.getRequest);

// Closes a ticket (ADMIN ONLY)
router.post("/closeticket", AssistanceController.closeTicket);

// Add a message to a ticket
router.post("/addmessage", AssistanceController.addMessage);

module.exports = router;
