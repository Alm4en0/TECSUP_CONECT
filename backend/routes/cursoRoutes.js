const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

// Rutas para cursos
router.post("/", cursoController.createCurso);
router.get("/", cursoController.getCursos);
router.get("/:id", cursoController.getCursoById);
router.put("/:id", cursoController.updateCurso);
router.delete("/:id", cursoController.deleteCurso);

module.exports = router;
