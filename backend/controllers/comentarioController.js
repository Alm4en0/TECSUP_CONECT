const Comentario = require("../models/Comentario");
const Post = require("../models/Post");

// Crear un nuevo comentario
exports.createComentario = async (req, res) => {
  try {
    const { autor, contenido, archivosAdjuntos, post } = req.body;

    const nuevoComentario = new Comentario({
      autor,
      contenido,
      archivosAdjuntos,
      post,
    });

    await nuevoComentario.save();

    // Agregar el comentario al post
    await Post.findByIdAndUpdate(post, {
      $push: { comentarios: nuevoComentario._id },
    });

    res.status(201).json({
      mensaje: "Comentario creado exitosamente",
      comentario: nuevoComentario,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear el comentario", error: error.message });
  }
};

exports.getComentariosByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comentarios = await Comentario.find({ post: postId })
      .populate("autor", "nombre email")
      .sort({ creadoEl: -1 });

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los comentarios",
      error: error.message,
    });
  }
};

// Actualizar un comentario
exports.updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido, archivosAdjuntos } = req.body;

    const comentarioActualizado = await Comentario.findByIdAndUpdate(
      id,
      { contenido, archivosAdjuntos, actualizadoEl: Date.now() },
      { new: true }
    );

    if (!comentarioActualizado) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    res.status(200).json({
      mensaje: "Comentario actualizado exitosamente",
      comentario: comentarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el comentario",
      error: error.message,
    });
  }
};

exports.deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;

    const comentarioEliminado = await Comentario.findByIdAndDelete(id);

    if (!comentarioEliminado) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    await Post.findByIdAndUpdate(comentarioEliminado.post, {
      $pull: { comentarios: comentarioEliminado._id },
    });

    res.status(200).json({ mensaje: "Comentario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};
