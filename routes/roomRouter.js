const express = require('express');
const bodyParser = require('body-parser');
const roomController = require('../controllers/RoomController');
const {getRooms, addRoom, getRoomById, updateRoomById, deleteRoomById, filterRooms} = require("../controllers/RoomController");
const schemas = require('../helpers/validaton_schema')

const roomRouter = express.Router();

roomRouter.route('/')
    .get(filterRooms)
    .post((req, res, next) => {
        const result_data = schemas.roomSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 201;
            addRoom(result_data.value)
            res.send("Created")
        }
    })

roomRouter.route('/:roomId')
    .get((req, res, next) => {

        const room = getRoomById(req.params.roomId)
        if (room) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(room)
        }else{
            res.statusCode = 403
            res.end('No room found')
        }
    })
    .put((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        const result_data = schemas.roomSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else if (!getRoomById(req.params.roomId)){
            res.statusCode = 403
            res.send("No room found")
        }
        else{
            res.statusCode = 200
            res.json(updateRoomById(req.params.roomId, result_data.value))
        }
    })
    .delete((req, res, next) => {
        if (!getRoomById(req.params.roomId)){
            res.statusCode = 403
            res.send("No room found")
        }
        else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(deleteRoomById(req.params.roomId))
        }
    })


module.exports = roomRouter;
