const express = require('express');

const furnitureController = require('../controllers/furniture.controller');

const furnitureRouter = express.Router();

furnitureRouter.route('/')
    .get(furnitureController.getFurniture)
    .post(furnitureController.addFurniture);

furnitureRouter.route('/:id')
    .get(furnitureController.getFurnitureById)
    .put(furnitureController.updateFurnitureById)
    .delete(furnitureController.deleteFurnitureById);

module.exports = furnitureRouter;
