const express = require('express');

const redisFurnitureController = require('../controllers/redis.furniture.controller');

const redisFurnitureRouter = express.Router();

redisFurnitureRouter.route('/:key')
    .get(redisFurnitureController.getFurnitureData);

module.exports = redisFurnitureRouter;
