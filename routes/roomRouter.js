const express = require('express');
const bodyParser = require('body-parser');
const roomController = require('../controllers/RoomController');
const {getRooms, addRoom, getRoomById, updateRoomById, deleteRoomById, filterRooms} = require("../controllers/RoomController");

const roomRouter = express.Router();

roomRouter.route('/')
    .get(filterRooms)
    .post((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(addRoom(req.body))
    })

roomRouter.route('/:roomId')
    .get((req, res, next) => {
        const room = getRoomById(req.params.roomId)
        if (room) {
            res.setHeader('Content-Type', 'application/json')
            res.json(room)
        }else{
            res.statusCode = 404
            res.end('No room found')
        }
    })
    .put((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(updateRoomById(req.params.roomId, req.body))
    })
    .delete((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(deleteRoomById(req.params.roomId))
    })


module.exports = roomRouter;
