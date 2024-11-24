const Carrera = require("../models/Carrera");

// Crear una nueva carrera
const crearCarrera = async (req, res) => {
  try {
    const { nombre, descripcion, numeroCiclos } = req.body;

    // Validación básica
    if (!nombre || !numeroCiclos) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    // Verificar si la carrera ya existe
    const carreraExistente = await Carrera.findOne({ nombre });
    if (carreraExistente) {
      return res.status(400).json({ mensaje: "La carrera ya existe" });
    }

    // Crear una nueva carrera
    const nuevaCarrera = new Carrera({
      nombre,
      descripcion,
      numeroCiclos,
    });

    // Guardar en la base de datos
    await nuevaCarrera.save();

    // Enviar respuesta
    res
      .status(201)
      .json({ mensaje: "Carrera creada exitosamente", carrera: nuevaCarrera });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear la carrera", error: error.message });
  }
};

// Obtener todas las carreras
const obtenerCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.status(200).json(carreras);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener las carreras", error: error.message });
  }
};

// Obtener una carrera por su ID
const obtenerCarreraPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findById(id);
    if (!carrera) {
      return res.status(404).json({ mensaje: "Carrera no encontrada" });
    }

    res.status(200).json(carrera);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la carrera", error: error.message });
  }
};

module.exports = {
  crearCarrera,
  obtenerCarreras,
  obtenerCarreraPorId,
};
