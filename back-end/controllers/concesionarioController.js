// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require('../config/sequelize.js');
// Función de logging
const { logMensaje } = require("../utils/logger.js");
// Método de creación de objetos de respuesta
const Respuesta = require('../utils/respuesta');

// Cargar las definiciones del modelo en sequelize
logMensaje(initModels);
const models = initModels(sequelize);

const Concesionario = models.concesionario;

exports.getConcesionarios = async (req, res) => {
  try {
    const concesionarios = await Concesionario.findAll();
    res.json(Respuesta.exito(concesionarios, 'Datos de los concesionarios recuperados'));
  } catch (error) {
    logMensaje(error);
    res.status(500).json(Respuesta.error(null, 'Error al recuperar los concesionarios:' + req.originalUrl));
  }
};

exports.crearConcesionario = async (req, res) => {
  const {nombre, direccion, fecha_fundacion, activo} = req.body;
  try {
    const nuevoConcesionario = await Concesionario.create({nombre, direccion, fecha_fundacion, activo});
    res.status(201).json(Respuesta.exito(nuevoConcesionario, 'Concesionario creado'));
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al crear el concesionario'));
  }
};

exports.eliminarConcesionario = async (req, res) => {
  const { id } = req.params;
  try {
    const concesionario = await Concesionario.findByPk(id);
    if (concesionario) {
      await concesionario.destroy();
      res.json(Respuesta.exito(concesionario, 'Concesionario eliminado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Concesionario no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al eliminar el concesionario'));
  }
};

exports.getConcesionarioId = async (req, res) => {
  const { id } = req.params;
  try {
    const concesionario = await Concesionario.findByPk(id);
    if (concesionario) {
      res.json(Respuesta.exito(concesionario, 'Concesionario recuperado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Concesionario no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al obtener el concesionario'));
  }
};

// Controlador para actualizar una nota por su ID
exports.actualizarConcesionario = async (req, res) => {
  const { id } = req.params;
  const {nombre, direccion, fecha_fundacion, activo} = req.body;
  try {
    const concesionario = await Concesionario.findByPk(id);
    if (concesionario) {
      concesionario.nombre = nombre;
      concesionario.direccion = direccion;
      concesionario.fecha_fundacion = fecha_fundacion;
      concesionario.activo = activo;
      await concesionario.save();
      res.json(Respuesta.exito(concesionario, 'Concesionario actualizado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Concesionario no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al actualizar el concesionario'));
  }
};
