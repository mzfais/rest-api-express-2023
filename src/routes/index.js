const express = require("express");
const router = express.Router();
const mhs = require("../controllers/MahasiswaController.js");
const auth = require("../controllers/AuthController.js");
const jwtAuth = require("../middleware/jwtAuth.js");

router.get("/mhs", jwtAuth(), mhs.getAll);
router.get("/mhs/:id", jwtAuth(), mhs.findById);
router.post("/mhs", jwtAuth(), mhs.create);
// user route
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);

module.exports = router;
