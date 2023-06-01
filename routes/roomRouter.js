const express = require('express');
const {addRoom, getRoomById, updateRoomById, deleteRoomById, filterRooms} = require("../controllers/RoomController");
const schemas = require('../helpers/validaton_schema')

const roomRouter = express.Router();

roomRouter.route('/')
    .get(filterRooms)
    .post((req, res) => {
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
    .get((req, res) => {
        const room = getRoomById(req.params.roomId)
        if (room) {
            const acceptHeader = req.headers.accept;
            if (acceptHeader && acceptHeader.includes('application/json')) {
                res.statusCode = 200
                res.json(room);
            } else {
                res.render('room', {room});
            }
        }else{
            res.statusCode = 404
            res.end('No room found')
        }
    })
    .put((req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const result_data = schemas.roomSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else if (!getRoomById(req.params.roomId)){
            res.statusCode = 404
            res.send("No room found")
        }
        else{
            res.statusCode = 200
            res.json(updateRoomById(req.params.roomId, result_data.value))
        }
    })
    .delete((req, res) => {
        if (!getRoomById(req.params.roomId)){
            res.statusCode = 404
            res.send("No room found")
        }
        else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(deleteRoomById(req.params.roomId))
        }
    })


module.exports = roomRouter;
