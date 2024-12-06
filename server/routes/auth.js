const express = require("express");
const loginController = require("../Autenticazione/controllers/loginController");
const credentialsController = require("../Autenticazione/controllers/credentialsController");

const router = express.Router();

router.use("/login", loginController);
router.use("/credentials", credentialsController);

module.exports = router;