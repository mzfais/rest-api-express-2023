const express = require("express");
const router = express.Router();
const dbPool = require("../db");
const mhs = require("../controllers/MahasiswaController.js");

router.get("/mhs", mhs.getAll);
router.get("/mhs/:id", mhs.findById);
router.post("/mhs", mhs.create);

module.exports = router;
