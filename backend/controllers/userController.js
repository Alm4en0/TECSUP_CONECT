const Usuario = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

// Configuración de las claves secretas
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  console.error(
    "ERROR: ACCESS_TOKEN_SECRET o REFRESH_TOKEN_SECRET no están definidos"
  );
  process.exit(1); // Salir de la aplicación si no están definidas las variables
}

// Registrar un nuevo usuario
const register = async (req, res) => {
  const { nombres, apellidos, correo, contrasena, rol, carreraId, ciclo } =
    req.body;

  try {
    // Validación del rol
    if (!["profesor", "estudiante"].includes(rol)) {
      return res.status(400).json({
        mensaje: "Rol inválido. Solo se permiten 'profesor' o 'estudiante'.",
      });
    }

    // Validación del dominio del correo
    if (!/@tecsup\.edu\.pe$/.test(correo)) {
      return res.status(400).json({
        mensaje:
          "El correo debe pertenecer al dominio 'tecsup.edu.pe'. Por favor, utiliza tu correo institucional.",
      });
    }

    // Verificación si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: `El correo ${correo} ya está registrado. Por favor, utiliza otro correo.`,
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      correo,
      contrasena: hashedPassword,
      rol,
      carreraId,
      ciclo: rol === "estudiante" ? ciclo : null,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor al registrar el usuario." });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({
        mensaje: `No se encontró un usuario con el correo ${correo}.`,
      });
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      return res.status(401).json({
        mensaje: "La contraseña ingresada es incorrecta. Intenta nuevamente.",
      });
    }

    const accessToken = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    console.log("AccessToken generado:", accessToken);

    const refreshToken = jwt.sign(
      { id: usuario._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }
    );
    console.log("RefreshToken generado:", refreshToken);

    // Guardar el refresh token en la base de datos
    await RefreshToken.create({ token: refreshToken, userId: usuario._id });

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar el inicio de sesión." });
  }
};

///REFRESH TOKEN
const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ mensaje: "Se requiere un token de refresh." });
  }

  try {
    const storedToken = await RefreshToken.findOne({ token });
    if (!storedToken) {
      return res
        .status(403)
        .json({ mensaje: "Refresh token inválido o no encontrado." });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, rol: decoded.rol },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido o expirado." });
  }
};

const logout = async (req, res) => {
  const { token } = req.body;

  try {
    // Eliminar el token de la base de datos
    await RefreshToken.findOneAndDelete({ token });

    res.status(200).json({ mensaje: "Cierre de sesión exitoso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cerrar sesión." });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
