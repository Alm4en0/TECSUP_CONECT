const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const connectToDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

// Rutas
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
