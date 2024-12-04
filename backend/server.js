const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const connectToDB = require("./config/db");

// Cargar variables de entorno
dotenv.config();

// Inicializar aplicación Express
const app = express();

// Configurar middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Conectar a la base de datos
connectToDB();

// Configurar rutas
app.use("/api/users", userRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
