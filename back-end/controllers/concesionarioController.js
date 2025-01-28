// pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.getAllPedido);
// router.get('/:idtipo', tipoController.getTipoById);
// router.post('/', tipoController.createTipo);
// router.put('/:idtipo', tipoController.updateTipo);
// router.delete('/:idtipo', tipoController.deleteTipo);

module.exports = router;