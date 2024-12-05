const Post = require("../models/Post");
const Usuario = require("../models/User");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single("file");

const createPost = async (req, res) => {
  const { titulo, contenido, tipo } = req.body;

  try {
    const nuevoPost = new Post({
      titulo: String,
      contenido: String,
      tipo: String,
      autor: req.userId,
      file: req.file?.path,
    });

    await nuevoPost.save();
    res.status(201).json({ mensaje: "Post creado exitosamente.", post: nuevoPost });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ mensaje: "Error al crear el post." });
  }
};

module.exports = {
  createPost,
};
