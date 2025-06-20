const express = require('express');
const router = express.Router();
const deseoController = require('../controllers/deseoController');

// Rutas de deseos
router.get('/', deseoController.getDeseos);
router.post('/', deseoController.createDeseo);
router.delete('/:id', deseoController.deleteDeseo);
router.put('/:id', deseoController.updateDeseo);

module.exports = router;
