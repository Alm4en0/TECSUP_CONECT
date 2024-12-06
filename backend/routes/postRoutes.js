const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/posts", authenticate, postController.createPost); // Crear un post
router.get("/", postController.getPosts); // Obtener todos los posts
router.get("/:id", postController.getPostById); // Obtener un post por ID
router.put("/:id", authenticate, postController.updatePost); // Actualizar un post
router.delete("/:id", authenticate, postController.deletePost); // Eliminar un post

module.exports = router;
