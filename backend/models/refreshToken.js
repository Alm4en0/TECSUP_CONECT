const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Elimina el token automáticamente después de 7 días
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
