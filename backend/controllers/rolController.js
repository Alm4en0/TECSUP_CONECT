const Rol = require("../models/Rol");

// Crear un nuevo rol
const crearRol = async (req, res) => {
  try {
    const { nombre, descripcion, permisos } = req.body;

    // Validación básica
    if (!nombre) {
      return res
        .status(400)
        .json({ mensaje: "El nombre del rol es requerido" });
    }

    // Verificar si el rol ya existe
    const rolExistente = await Rol.findOne({ nombre });
    if (rolExistente) {
      return res.status(400).json({ mensaje: "El rol ya existe" });
    }

    // Crear un nuevo rol
    const nuevoRol = new Rol({
      nombre,
      descripcion,
      permisos,
    });

    // Guardar en la base de datos
    await nuevoRol.save();

    // Enviar respuesta
    res.status(201).json({ mensaje: "Rol creado exitosamente", rol: nuevoRol });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el rol", error: error.message });
  }
};

// Obtener todos los roles
const obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los roles", error: error.message });
  }
};

// Obtener un rol por su ID
const obtenerRolPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findById(id);
    if (!rol) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    res.status(200).json(rol);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener el rol", error: error.message });
  }
};

module.exports = {
  crearRol,
  obtenerRoles,
  obtenerRolPorId,
};
