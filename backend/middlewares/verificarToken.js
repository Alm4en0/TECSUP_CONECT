const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extraer el token

  if (!token) {
    return res.status(403).json({ mensaje: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token decodificado:", decoded); // <-- Log para inspeccionar el token
    req.usuario = decoded; // Almacenar los datos del usuario decodificados
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err); // <-- Log del error
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};
