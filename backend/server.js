const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const carreraRoutes = require("./routes/carreraRoutes");
const postRoutes = require("./routes/postRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const connectToDB = require("./config/db");

// Inicializar aplicación Express
const app = express();

// Configurar middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

// Conectar a la base de datos
connectToDB();

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/cursos", cursoRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
