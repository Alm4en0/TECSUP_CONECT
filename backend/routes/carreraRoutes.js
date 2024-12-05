// routes/carreraRoutes.js
const express = require("express");
const router = express.Router();
const carreraController = require("../controllers/carreraController");
const authMiddleware = require("../middlewares/authMiddleware"); // Si tienes un middleware de autenticación

// Ruta para crear una nueva carrera
router.post("/", authMiddleware, carreraController.crearCarrera);

// Ruta para obtener todas las carreras
router.get("/", carreraController.obtenerCarreras);

// Ruta para obtener una carrera por ID
router.get("/:id", carreraController.obtenerCarreraPorId);

module.exports = router;
