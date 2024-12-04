const mongoose = require("mongoose");
const Carrera = require("./Carrera");
const Rol = require("./Rol");
const Post = require("./Post");

const usuarioSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: {
      type: String,
      required: true,
      unique: true,
      match: /@tecsup\.edu\.pe$/,
      lowercase: true,
    },
    contrasena: { type: String },
    rol: {
      type: String,
      ref: "Rol",
      required: true,
    },
    carreraId: {
      type: String,
      ref: "Carrera",
      required: true,
    },
    ciclo: {
      type: Number,
    },
    fotoPerfil: { type: String, default: null },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    postsGuardados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
