const mongoose = require("mongoose");

const rolSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, default: "" },
  permisos: { type: [String], default: [] },
  creadoEl: { type: Date, default: Date.now },
  actualizadoEl: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rol", rolSchema);
