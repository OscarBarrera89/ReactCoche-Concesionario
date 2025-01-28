// Importar libreria para manejo de ficheros de configuración
require('dotenv').config();
// Importar fichero de configuración con variables de entorno
const config = require('./config/config');
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});
