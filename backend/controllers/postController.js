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
    res
      .status(201)
      .json({ mensaje: "Post creado exitosamente.", post: nuevoPost });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ mensaje: "Error al crear el post." });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("autor", "name profile")
      .sort({ creadoEl: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ mensaje: "Error al obtener los posts." });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate("autor", "name profile")
      .populate("comentarios");
    if (!post) return res.status(404).json({ mensaje: "Post no encontrado." });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error al obtener el post por ID:", error);
    res.status(500).json({ mensaje: "Error al obtener el post." });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, tipo } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { titulo, contenido, tipo, actualizadoEl: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ mensaje: "Post no encontrado." });

    res.status(200).json({ mensaje: "Post actualizado exitosamente.", post });
  } catch (error) {
    console.error("Error al actualizar el post:", error);
    res.status(500).json({ mensaje: "Error al actualizar el post." });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ mensaje: "Post no encontrado." });

    res.status(200).json({ mensaje: "Post eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(500).json({ mensaje: "Error al eliminar el post." });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
