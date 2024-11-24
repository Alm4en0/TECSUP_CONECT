const Usuario = require("../models/User");
const bcrypt = require("bcryptjs"); // Para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Para manejar la autenticación basada en tokens

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      correo,
      contrasena,
      rol,
      carreraId,
      ciclo,
      fotoPerfil,
    } = req.body;

    // Validación básica
    if (
      !nombres ||
      !apellidos ||
      !correo ||
      !contrasena ||
      !rol ||
      !carreraId ||
      !ciclo
    ) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      correo,
      contrasena: contrasenaEncriptada,
      rol,
      carreraId,
      ciclo,
      fotoPerfil,
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();

    // Enviar respuesta
    res
      .status(201)
      .json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el usuario", error: error.message });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate("rol", "nombre")
      .populate("carreraId", "nombre")
      .exec();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id)
      .populate("rol", "nombre")
      .populate("carreraId", "nombre")
      .exec();
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener el usuario", error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    // Validar si el usuario existe
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar el usuario con los datos enviados
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { $set: datosActualizados },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        mensaje: "Error al actualizar el usuario",
        error: error.message,
      });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el usuario", error: error.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
