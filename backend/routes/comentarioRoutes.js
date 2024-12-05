const express = require("express");
const router = express.Router();
const comentarioController = require("../Controllers/comentarioController");

// Rutas para comentarios
router.post("/", comentarioController.createComentario); // Crear un nuevo comentario
router.get("/:postId", comentarioController.getComentariosByPost); // Obtener comentarios por Post ID
router.put("/:id", comentarioController.updateComentario); // Actualizar un comentario por ID
router.delete("/:id", comentarioController.deleteComentario); // Eliminar un comentario por ID

module.exports = router;
