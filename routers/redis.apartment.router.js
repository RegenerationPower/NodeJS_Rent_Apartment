const express = require('express');

const redisApartmentController = require('../controllers/redis.apartment.controller');

const redisApartmentRouter = express.Router();

redisApartmentRouter.route('/:key')
    .get(redisApartmentController.getApartmentsData);

module.exports = redisApartmentRouter;
