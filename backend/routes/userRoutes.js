const express = require("express");
const userController = require("../Controllers/userController");
const verifyToken = require("../middlewares/verificarToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/auth", verifyToken);

module.exports = router;
