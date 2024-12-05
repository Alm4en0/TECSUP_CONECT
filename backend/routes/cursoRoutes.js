const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

// Rutas para cursos
router.post("/", cursoController.createCurso); // Crear un nuevo curso
router.get("/", cursoController.getCursos); // Obtener todos los cursos
router.get("/:id", cursoController.getCursoById); // Obtener un curso por ID
router.put("/:id", cursoController.updateCurso); // Actualizar un curso por ID
router.delete("/:id", cursoController.deleteCurso); // Eliminar un curso por ID

module.exports = router;
