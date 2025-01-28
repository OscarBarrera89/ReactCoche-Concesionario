// platoRoutes.js
const express = require('express');
const router = express.Router();
const platoController = require('../controllers/platoController');

router.get('/', platoController.getAllPlato);
router.get('/:idplato', platoController.getPlatoById);
router.post('/', platoController.createPlato);
router.delete('/:idplato', platoController.deletePlato);
router.put('/:idplato', platoController.updatePlato);


module.exports = router;