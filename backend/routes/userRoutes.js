const express = require("express");
const userController = require("../Controllers/userController");
const verifyToken = require("../middlewares/verificarToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas
router.post("/register", userController.register); // Ruta para registrar un nuevo usuario
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.get("/me", authMiddleware, (req, res) => {
  // Si la autenticación es correcta, este código se ejecutará
  res.status(200).json({
    mensaje: "Usuario autenticado",
    usuario: req.user, // Aquí se obtiene la información del usuario desde el token
  });
});

module.exports = router;
