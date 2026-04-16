const express = require("express");
const router = express.Router();

const prokeralaController = require("../controllers/prokeralaController");

router.get("/kundli-full", prokeralaController.getKundli);

module.exports = router;
