const express = require('express');
const router = express.Router();
const concesionarioController = require('../controllers/concesionarioController');

router.get('/', concesionarioController.getConcesionarios);
router.post('/', concesionarioController.crearConcesionario);
router.delete('/:id', concesionarioController.eliminarConcesionario);
router.put('/:id', concesionarioController.actualizarConcesionario);
router.get('/nombre/:nombre', concesionarioController.getConcesionarioNombre);
router.get('/:id', concesionarioController.getConcesionarioId);

module.exports = router;