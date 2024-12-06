const express = require("express");
const delController = require("../controllers/delController");

const router = express.Router();

router.use("/", delController);

module.exports = router;