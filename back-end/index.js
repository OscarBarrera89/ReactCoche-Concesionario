// Importar librerías
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importar rutas
const cocheRoutes = require("./routes/cocheRoutes");
const concesionarioRoutes = require("./routes/concesionarioRoutes");

// Importar conexión a la base de datos
const sequelize = require("./config/sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/coche", cocheRoutes);
app.use("/api/concesionario", concesionarioRoutes);

// Iniciar el servidor
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}

//Exportamos la aplicacion para hacer pruebas
module.exports = app;
