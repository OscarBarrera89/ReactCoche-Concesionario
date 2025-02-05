// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models").initModels;
const { where } = require("sequelize");
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require('../config/sequelize.js');
// Función de logging
const { logMensaje } = require("../utils/logger.js");
// Método de creación de objetos de respuesta
const Respuesta = require('../utils/respuesta');

// Cargar las definiciones del modelo en sequelize
logMensaje(initModels);
const models = initModels(sequelize);

// Recuperar el modelo nota
const Coche = models.coche;

// Controlador para obtener todas las notas
exports.getCoches = async (req, res) => {
  try {
    const coches = await Coche.findAll();
    res.json(Respuesta.exito(coches, 'Datos de coches recuperados'));
  } catch (error) {
    logMensaje(error);
    res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos:' + req.originalUrl));
  }
};

exports.crearCoche = async (req, res) => {
  const {id_coche, id_concesionario, matricula, modelo, precio, disponible, fecha_registro } = req.body;
  try {
    const nuevoCoche = await Coche.create({id_coche, id_concesionario, matricula, modelo, precio, disponible, fecha_registro });
    res.status(201).json(Respuesta.exito(nuevoCoche, 'Coche creado'));
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al crear el coche'));
  }
};

exports.eliminarCoche = async (req, res) => {
  const { id } = req.params;
  try {
    const coche = await Coche.findByPk(id);
    if (coche) {
      await coche.destroy();
      res.json(Respuesta.exito(coche, 'Coche eliminado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Coche no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al eliminar el coche'));
  }
};

exports.getCocheId = async (req, res) => {
  const { id } = req.params;
  try {
    const coche = await Coche.findByPk(id);
    if (coche) {
      res.json(Respuesta.exito(coche, 'Coche recuperado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Coche no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al obtener el coche'));
  }
};

exports.getCocheMatricula = async (req, res) => {
  const { matricula } = req.params;
  try {
    const coches = await Coche.findAll({ where : { matricula: matricula } });
    if (coches.length > 0) {
      res.json(Respuesta.exito(coches[0], 'Coche recuperado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Coche no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al obtener el coche'));
  }
};

exports.actualizarCoche = async (req, res) => {
  const { id } = req.params;
  const {id_concesionario, matricula, modelo, precio, disponible, fecha_registro } = req.body;
  try {
    const coche = await Coche.findByPk(id);
    if (coche) {
      coche.id_concesionario = id_concesionario;
      coche.matricula = matricula;
      coche.modelo = modelo;
      coche.precio = parseFloat(precio);
      coche.disponible = disponible;
      coche.fecha_registro = fecha_registro;
      await coche.save();
      res.json(Respuesta.exito(coche, 'Coche actualizado'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Coche no encontrado'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al actualizar el coche'));
  }
};