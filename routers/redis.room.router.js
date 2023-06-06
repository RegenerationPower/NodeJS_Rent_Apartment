const express = require('express');

const redisRoomController = require('../controllers/redis.room.controller');

const redisRoomRouter = express.Router();

redisRoomRouter.route('/:key')
    .get(redisRoomController.getRoomsData);

module.exports = redisRoomRouter;
