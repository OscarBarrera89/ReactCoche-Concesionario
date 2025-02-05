const express = require('express');
const router = express.Router();
const cocheController = require('../controllers/cocheController');

router.get('/', cocheController.getCoches);
router.post('/', cocheController.crearCoche);
router.delete('/:id', cocheController.eliminarCoche);
router.put('/:id', cocheController.actualizarCoche);
router.get('/matricula/:matricula', cocheController.getCocheMatricula);
router.get('/:id', cocheController.getCocheId);


module.exports = router;