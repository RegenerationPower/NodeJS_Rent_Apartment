const express = require('express');

const roomController = require('../controllers/room.controller');

const roomRouter = express.Router();

roomRouter.route('/')
    .get(roomController.getRooms)
    .post(roomController.addRoom);

roomRouter.route('/:id')
    .get(roomController.getRoomById)
    .put(roomController.updateRoomById)
    .delete(roomController.deleteRoomById);

module.exports = roomRouter;
