const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Guarda el userId en la solicitud
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(403).json({ mensaje: "Token inválido." });
  }
};

module.exports = authenticate;
