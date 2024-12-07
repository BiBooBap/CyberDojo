const express = require("express");
const registrationController = require("../Registrazione/controllers/registrationController");

const router = express.Router();

router.use("/", registrationController);

module.exports = router;