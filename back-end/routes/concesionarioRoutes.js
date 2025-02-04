const express = require('express');
const router = express.Router();
const concesionarioController = require('../controllers/concesionarioController');

router.get('/', concesionarioController.getConcesionarios);
router.post('/', concesionarioController.crearConcesionario);
router.delete('/:id', concesionarioController.eliminarConcesionario);
router.get('/:id', concesionarioController.getConcesionarioId);
router.put('/:id', concesionarioController.actualizarConcesionario);

module.exports = router;