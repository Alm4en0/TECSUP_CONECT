const express = require("express");
const { register, login } = require("../controllers/userController");

const router = express.Router();

// Rutas
router.post("/register", register);
router.post("/login", login);

module.exports = router;