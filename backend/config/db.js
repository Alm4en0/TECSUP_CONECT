const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1); // Terminar el proceso si no se puede conectar
  }
};

module.exports = connectToDB;
