const Usuario = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const register = async (req, res) => {
  const { nombres, apellidos, correo, contrasena, rol, carreraId, ciclo } = req.body;

  try {
    // Validar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    // Validar dominio del correo
    if (!/@tecsup\.edu\.pe$/.test(correo)) {
      return res.status(400).json({ mensaje: "El correo debe pertenecer al dominio tecsup.edu.pe." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario ({
      nombres,
      apellidos,
      correo,
      contrasena: hashedPassword,
      rol,
      carreraId
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario." });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión." });
  }
};

module.exports = {
  register,
  login,
};
