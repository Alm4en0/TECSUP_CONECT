const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");
const verificarToken = require("../middlewares/verificarToken");

// Rutas de post
router.post(
  "/create",
  verificarToken,
  postController.uploadMiddleware,
  postController.createPost
); // Crear un nuevo post
router.get("/", postController.getPosts); // Obtener todos los posts
router.get("/:id", postController.getPostById); // Obtener un post por ID
router.put("/:id", postController.updatePost); // Actualizar un post por ID
router.delete("/:id", postController.deletePost); // Eliminar un post por ID

module.exports = router;
