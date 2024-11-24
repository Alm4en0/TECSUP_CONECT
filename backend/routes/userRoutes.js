const express = require("express");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/userController");
const {
  crearRol,
  obtenerRoles,
  obtenerRolPorId,
} = require("../controllers/rolController");
const {
  crearCarrera,
  obtenerCarreras,
  obtenerCarreraPorId,
} = require("../controllers/carreraController");

const router = express.Router();

// Rutas de Usuario
router.post("/usuarios", crearUsuario);
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorId);
router.patch("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

// Rutas de Rol
router.post("/roles", crearRol);
router.get("/roles", obtenerRoles);
router.get("/roles/:id", obtenerRolPorId);

// Rutas de Carrera
router.post("/carreras", crearCarrera);
router.get("/carreras", obtenerCarreras);
router.get("/carreras/:id", obtenerCarreraPorId);

module.exports = router;
