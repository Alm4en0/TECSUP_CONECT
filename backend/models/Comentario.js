const mongoose = require("mongoose");
const Usuario = require("./User.js");
const Post = require("./Post");

const comentarioSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  contenido: { type: String, required: true },
  archivosAdjuntos: [
    {
      nombreArchivo: { type: String },
      urlArchivo: { type: String },
      tipoArchivo: { type: String },
      subidoEl: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  creadoEl: { type: Date, default: Date.now },
  actualizadoEl: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comentario", comentarioSchema);
