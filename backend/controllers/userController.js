const Usuario = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { nombres, apellidos, correo, contrasena, rol, carreraId, ciclo } = req.body;

	try {
		const usuarioExistente = await Usuario.findOne({ correo });
		if (usuarioExistente) {
			return res.status(400).json({ mensaje: "El correo ya está registrado." });
		}

		if (!/@tecsup\.edu\.pe$/.test(correo)) {
			return res.status(400).json({ mensaje: "El correo debe pertenecer al dominio tecsup.edu.pe." });
		}

		const hashedPassword = await bcrypt.hash(contrasena, 10);

		const nuevoUsuario = new Usuario({
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

const login = async (req, res) => {
	const { correo, contrasena } = req.body;

	try {
		const usuario = await Usuario.findOne({ correo });
		if (!usuario) {
			return res.status(404).json({ mensaje: "Usuario no encontrado." });
		}

		const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
		if (!contrasenaValida) {
			return res.status(401).json({ mensaje: "Contraseña incorrecta." });
		}

		const token = jwt.sign(
			{ userId: usuario._id, correo: usuario.correo, rol: usuario.rol },
			process.env.JWT_SECRET,
		);

		res.status(200).json({
			mensaje: "Inicio de sesión exitoso.",
			token,
			userId:usuario._id

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