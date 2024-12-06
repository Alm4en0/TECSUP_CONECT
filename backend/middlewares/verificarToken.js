const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ mensaje: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token decodificado:", decoded);
    req.usuario = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};
