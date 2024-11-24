const mongoose = require("mongoose");
const Usuario = require("./User");
const Curso = require("./Curso");
const Carrera = require("./Carrera");
const Comentario = require("./Comentario");

const postSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  tipo: { type: String, enum: ["pregunta", "información"], required: true },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrera",
    required: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
    default: null,
  },
  archivosAdjuntos: [
    {
      nombreArchivo: { type: String },
      urlArchivo: { type: String },
      tipoArchivo: { type: String },
      subidoEl: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentario" }],
  vistas: { type: Number, default: 0 },
  creadoEl: { type: Date, default: Date.now },
  actualizadoEl: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
