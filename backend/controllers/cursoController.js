const Curso = require("../models/Curso");

exports.createCurso = async (req, res) => {
  try {
    const { nombre, descripcion, carreraId } = req.body;

    const nuevoCurso = new Curso({
      nombre,
      descripcion,
      carreraId,
    });

    await nuevoCurso.save();
    res
      .status(201)
      .json({ mensaje: "Curso creado exitosamente", curso: nuevoCurso });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ mensaje: "El nombre del curso ya existe" });
    } else {
      res
        .status(500)
        .json({ mensaje: "Error al crear el curso", error: error.message });
    }
  }
};

exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().populate("carreraId", "nombre");
    res.status(200).json(cursos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener los cursos", error: error.message });
  }
};

exports.getCursoById = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id).populate("carreraId", "nombre");

    if (!curso) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json(curso);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener el curso", error: error.message });
  }
};

exports.updateCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, carreraId } = req.body;

    const cursoActualizado = await Curso.findByIdAndUpdate(
      id,
      { nombre, descripcion, carreraId, actualizadoEl: Date.now() },
      { new: true }
    );

    if (!cursoActualizado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({
      mensaje: "Curso actualizado exitosamente",
      curso: cursoActualizado,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ mensaje: "El nombre del curso ya existe" });
    } else {
      res.status(500).json({
        mensaje: "Error al actualizar el curso",
        error: error.message,
      });
    }
  }
};

// Eliminar un curso
exports.deleteCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const cursoEliminado = await Curso.findByIdAndDelete(id);

    if (!cursoEliminado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({ mensaje: "Curso eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el curso", error: error.message });
  }
};
