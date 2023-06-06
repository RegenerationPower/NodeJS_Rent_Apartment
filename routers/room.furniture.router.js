const express = require('express');

const roomFurnitureController = require('../controllers/room.furniture.controller');

const roomFurnitureRouter = express.Router();

roomFurnitureRouter.route('/')
    .get(roomFurnitureController.getRoomFurniture)
    .get(roomFurnitureController.filterRoomFurniture)
    .post(roomFurnitureController.addRoomFurniture);

roomFurnitureRouter.route('/:id')
    .get(roomFurnitureController.getRoomFurnitureById)
    .put(roomFurnitureController.updateRoomFurnitureById)
    .delete(roomFurnitureController.deleteRoomFurnitureById);

module.exports = roomFurnitureRouter;
