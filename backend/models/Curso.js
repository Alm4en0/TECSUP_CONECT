const mongoose = require("mongoose");
const Carrera = require("./Carrera");

const cursoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, default: "" },
  carreraId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrera",
    required: true,
  },
  creadoEl: { type: Date, default: Date.now },
  actualizadoEl: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Curso", cursoSchema);
