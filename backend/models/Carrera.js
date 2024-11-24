const mongoose = require("mongoose");

const carreraSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, default: "" },
  numeroCiclos: {
    type: Number,
    required: true,
  },
  creadoEl: { type: Date, default: Date.now },
  actualizadoEl: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Carrera", carreraSchema);
