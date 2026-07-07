const express = require('express');
const router = express.Router();
const controller = require('../controllers/car.controller');

router.get('/', controller.getAllCars);
router.post('/', controller.createCar);
router.put('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

module.exports = router;