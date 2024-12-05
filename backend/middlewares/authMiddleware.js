const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtenemos el token del encabezado

  if (!token) {
    return res.status(403).json({ mensaje: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    const usuario = await Usuario.findById(decoded.id); // Busca el usuario en la BD
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    req.usuario = usuario; // Guarda el usuario en la request
    next(); // Continúa al siguiente middleware o controlador
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res
      .status(401)
      .json({ mensaje: "Token inválido.", error: err.message });
  }
};
