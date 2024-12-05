const Post = require("../models/Post");
const Usuario = require("../models/User");
const multer = require("multer");
const path = require("path");

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
  },
});

const upload = multer({ storage: storage });

// Middleware para la subida de archivos
exports.uploadMiddleware = upload.single("file");

exports.createPost = async (req, res) => {
  try {
    const { titulo, contenido, tipo, carrera } = req.body;
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado." });
    }

    // Verificamos si se subió un archivo
    const archivo = req.file
      ? {
          nombreArchivo: req.file.originalname,
          urlArchivo: req.file.path,
          tipoArchivo: req.file.mimetype,
        }
      : null;

    const nuevoPost = new Post({
      autor: req.usuario._id,
      titulo,
      contenido,
      tipo,
      carrera,
      archivosAdjuntos: archivo,
    });

    await nuevoPost.save();
    res
      .status(201)
      .json({ mensaje: "Post creado exitosamente.", post: nuevoPost });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el post.", error: error.message });
  }
};

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("autor", "nombre correo")
      .populate("carrera", "nombre")
      .sort({ creadoEl: -1 }); // Ordenar por fecha de creación, descendente

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener los posts", error: error.message });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("autor", "nombre correo")
      .populate("carrera", "nombre")
      .populate({
        path: "comentarios",
        populate: { path: "autor", select: "nombre correo" },
      });

    if (!post) {
      return res.status(404).json({ mensaje: "Post no encontrado" });
    }

    // Incrementar el contador de vistas
    post.vistas += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener el post", error: error.message });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, tipo, carrera, archivosAdjuntos } = req.body;

    const postActualizado = await Post.findByIdAndUpdate(
      id,
      {
        titulo,
        contenido,
        tipo,
        carrera,
        archivosAdjuntos,
        actualizadoEl: Date.now(),
      },
      { new: true }
    );

    if (!postActualizado) {
      return res.status(404).json({ mensaje: "Post no encontrado" });
    }

    res.status(200).json({
      mensaje: "Post actualizado exitosamente",
      post: postActualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el post", error: error.message });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postEliminado = await Post.findByIdAndDelete(id);

    if (!postEliminado) {
      return res.status(404).json({ mensaje: "Post no encontrado" });
    }

    res.status(200).json({ mensaje: "Post eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el post", error: error.message });
  }
};
